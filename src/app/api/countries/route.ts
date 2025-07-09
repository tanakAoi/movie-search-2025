import { fetchCountries } from "@/lib/controllers/profileController";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const countries = await fetchCountries();
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
