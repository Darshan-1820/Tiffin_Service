import { google } from "googleapis";

export interface MenuItem {
  mealType: string;
  name: string;
  ingredients: string;
  calories: string;
}

export async function getMenuFromSheets(): Promise<MenuItem[]> {
  const email = process.env.GOOGLE_CLIENT_EMAIL;
  const key = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");
  const sheetId = process.env.GOOGLE_SHEET_ID;

  if (!email || !key || !sheetId) {
    return [];
  }

  const auth = new google.auth.JWT({
    email,
    key,
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range: "Menu!A2:D", // Skip header row
  });

  const rows = res.data.values || [];

  return rows.map((row) => ({
    mealType: row[0] || "",
    name: row[1] || "",
    ingredients: row[2] || "",
    calories: row[3] || "",
  }));
}
