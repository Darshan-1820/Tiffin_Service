import { NextResponse } from "next/server";
import { getMenuFromSheets } from "@/lib/google-sheets";

export async function GET() {
  try {
    const menu = await getMenuFromSheets();

    return NextResponse.json(menu, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=1800",
      },
    });
  } catch (error) {
    console.error("Failed to fetch menu:", error);
    return NextResponse.json(
      { error: "Failed to load menu" },
      { status: 500 }
    );
  }
}
