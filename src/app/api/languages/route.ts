import { fetchLanguages } from "@/lib/controllers/profileController";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const languages = await fetchLanguages();
    if (!languages || languages.length === 0) {
      return NextResponse.json(
        { error: "Languages not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(languages, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}
