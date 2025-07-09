import { fetchCountries } from "@/lib/controllers/profileController";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const lang = searchParams.get("lang") || "";

    const countries = await fetchCountries(lang);
    if (!countries) {
      return NextResponse.json(
        { error: "Countries not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(countries, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}
