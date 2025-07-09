import { getUpcomingMovies } from "@/lib/controllers/movieController";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const lang = searchParams.get("lang") || "";
    const country = searchParams.get("country") || "";
    const movies = await getUpcomingMovies(lang, country);
    return NextResponse.json(movies);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error fetching movies" },
      { status: 500 }
    );
  }
}
