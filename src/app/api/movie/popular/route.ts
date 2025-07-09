import { NextRequest, NextResponse } from "next/server";
import { getPopularMovies } from "@/lib/controllers/movieController";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const lang = searchParams.get("lang") || "";
    const country = searchParams.get("country") || "";

    const movies = await getPopularMovies(lang, country);
    return NextResponse.json(movies);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error fetching movies" },
      { status: 500 }
    );
  }
}
