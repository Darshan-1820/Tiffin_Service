# Google Sheets Integration Guide

**How the website automatically shows today's menu from a Google Sheet.**

---

## Overview

The Tiffin Kart website reads today's menu directly from a Google Sheet that the client updates on his phone. No code changes needed — he just types into the sheet, and the website reflects the update.

```
Client's Phone (Google Sheets app)
        │
        ▼
   Google Sheet
   (Cloud — always online)
        │
        ▼
   Google Sheets API v4
   (reads the sheet data)
        │
        ▼
   Next.js API Route (/api/menu)
   (fetches + formats the data)
        │
        ▼
   Website (/menu page)
   (displays it to customers)
```

---

## How It Works — Step by Step

### Step 1: The Google Sheet

The client has a Google Sheet with this structure:

| Column A | Column B | Column C | Column D |
|----------|----------|----------|----------|
| **Meal Type** | **Dish Name** | **Ingredients** | **Calories** |
| Lunch | Dal Tadka | Toor dal, tomato, onion, garlic, cumin, turmeric, ghee | 180 |
| Lunch | Aloo Gobi | Potato, cauliflower, tomato, ginger, green chili | 165 |
| Dinner | Paneer Masala | Paneer, tomato, butter, cream, cashew | 280 |

- **Row 1** is the header (the code skips it)
- The client adds/edits rows on his phone using the Google Sheets app (free)
- He can update it daily — just change the dish names and ingredients

### Step 2: Google Service Account (the "key" to read the sheet)

Google won't let random code read your sheet. You need a **Service Account** — think of it as a "robot Google account" that has permission to read the sheet.

**What a Service Account is:**
- It's a special Google account created in Google Cloud Console
- It has an email like `tiffin-cart@project-name.iam.gserviceaccount.com`
- It has a private key (a long secret string) that proves it's authorized
- The sheet must be "shared" with this email — just like sharing with a person

**The 3 credentials we store:**
| Environment Variable | What It Is |
|---|---|
| `GOOGLE_CLIENT_EMAIL` | The service account's email address |
| `GOOGLE_PRIVATE_KEY` | The secret key that authenticates the service account |
| `GOOGLE_SHEET_ID` | The ID of the Google Sheet (from the sheet URL) |

**Where the Sheet ID comes from:**
```
https://docs.google.com/spreadsheets/d/1AbCdEfGhIjKlMnOpQrStUvWxYz/edit
                                       ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
                                       This is the GOOGLE_SHEET_ID
```

### Step 3: The Code — `lib/google-sheets.ts`

```typescript
import { google } from "googleapis";

export interface MenuItem {
  mealType: string;  // "Lunch" or "Dinner"
  name: string;      // "Dal Tadka"
  ingredients: string; // "Toor dal, tomato, onion..."
  calories: string;  // "180"
}

export async function getMenuFromSheets(): Promise<MenuItem[]> {
  // 1. Read credentials from environment variables
  const email = process.env.GOOGLE_CLIENT_EMAIL;
  const key = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");
  const sheetId = process.env.GOOGLE_SHEET_ID;

  // 2. If any credential is missing, return empty (graceful fallback)
  if (!email || !key || !sheetId) {
    return [];
  }

  // 3. Create an authenticated "JWT" connection
  //    JWT = JSON Web Token — a secure way to prove identity
  const auth = new google.auth.JWT({
    email,
    key,
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    //        ↑ This means "read-only access" — the code can never edit the sheet
  });

  // 4. Connect to the Google Sheets API
  const sheets = google.sheets({ version: "v4", auth });

  // 5. Fetch data from the sheet
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range: "Menu!A2:D",
    //      ↑ Sheet tab name is "Menu"
    //         ↑ Start from row 2 (skip header)
    //           ↑ Columns A through D
  });

  // 6. Convert raw rows into structured objects
  const rows = res.data.values || [];
  return rows.map((row) => ({
    mealType: row[0] || "",
    name: row[1] || "",
    ingredients: row[2] || "",
    calories: row[3] || "",
  }));
}
```

### Step 4: The API Route — `app/api/menu/route.ts`

```typescript
import { NextResponse } from "next/server";
import { getMenuFromSheets } from "@/lib/google-sheets";

export async function GET() {
  try {
    const menu = await getMenuFromSheets();

    return NextResponse.json(menu, {
      headers: {
        // Cache for 1 hour, serve stale for 30 min while revalidating
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=1800",
      },
    });
  } catch (error) {
    console.error("Failed to fetch menu:", error);
    return NextResponse.json({ error: "Failed to load menu" }, { status: 500 });
  }
}
```

**What the caching does:**
- `s-maxage=3600` — Netlify/CDN stores the result for 1 hour
- `stale-while-revalidate=1800` — After 1 hour, serves the old data while fetching new data in the background
- This means the Google Sheet isn't hit on every page visit — it's hit at most once per hour

### Step 5: The Website Displays It

The `/menu` page or homepage's TodaysMenu section calls this API and renders the data. Currently the homepage uses hardcoded sample data (for the static build), while the `/menu` page can call the API for live data.

---

## Setup Instructions (from scratch)

### 1. Create a Google Cloud Project

1. Go to [console.cloud.google.com](https://console.cloud.google.com)
2. Create a new project (name: "Tiffin Kart" or anything)
3. Enable the **Google Sheets API**:
   - Go to APIs & Services → Library
   - Search "Google Sheets API"
   - Click Enable

### 2. Create a Service Account

1. Go to APIs & Services → Credentials
2. Click "Create Credentials" → "Service Account"
3. Name it (e.g., "tiffin-menu-reader")
4. Skip the optional steps → Done
5. Click into the service account → Keys tab
6. Add Key → Create new key → JSON
7. A `.json` file downloads — this contains the email and private key

### 3. Share the Sheet

1. Open the Google Sheet
2. Click "Share"
3. Paste the service account email (from the JSON file, field `client_email`)
4. Give it "Viewer" access (read-only is enough)

### 4. Set Environment Variables

Create `.env.local` in the project root:

```
GOOGLE_CLIENT_EMAIL=tiffin-menu-reader@project-name.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIE...\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEET_ID=1AbCdEfGhIjKlMnOpQrStUvWxYz
```

**Important:** The private key has `\n` characters — they must stay as literal `\n` in the `.env.local` file. The code converts them to real newlines with `.replace(/\\n/g, "\n")`.

### 5. On Netlify (Production)

1. Go to Site settings → Environment variables
2. Add the same 3 variables
3. Redeploy

---

## How the Client Uses It

1. Open Google Sheets app on phone
2. Go to the "Menu" tab
3. Edit today's dishes — change names, ingredients, calories
4. Save (automatic)
5. Website updates within ~1 hour (cache duration)

**That's it.** No code, no deployment, no technical knowledge needed.

---

## Security Notes

- The service account has **read-only** access — it can never modify the sheet
- The private key is stored in environment variables — never committed to Git
- The `.env.local` file is in `.gitignore`
- The API route is public (`/api/menu`) but only serves menu data — no sensitive info

---

## Limitations & Future Improvements

| Current | Future (Phase 3) |
|---------|-------------------|
| Menu updates take up to 1 hour to reflect | Real-time updates via webhook or shorter cache |
| Client must know Google Sheets | Admin panel — type once, everything updates |
| No validation of what client enters | Admin panel with dropdowns and validation |
| Separate WhatsApp broadcast needed | Auto WhatsApp message when menu is updated |

---

## Cost

**Everything in this integration is free:**
- Google Sheets — free
- Google Sheets API — free up to 300 requests/minute (we use ~24/day)
- Google Cloud project — free tier covers this entirely
- Netlify hosting — free tier

**Total cost: ₹0/month**

---

*Last updated: 2026-02-28*
