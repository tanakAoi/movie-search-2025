import { NextResponse } from "next/server";
import { fetchLanguages } from "@/lib/controllers/profileController";

export async function GET() {
  try {
    const languages = await fetchLanguages();
    return NextResponse.json(languages);
  } catch (error) {
    console.error("Error fetching languages:", error);
    return NextResponse.error();
  }
}
