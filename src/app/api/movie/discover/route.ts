import { NextRequest, NextResponse } from "next/server";
import { getDiscoverMovies } from "@/lib/controllers/movieController";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const genre = searchParams.get("genre") || "";
    const lang = searchParams.get("lang") || "";
    const page = parseInt(searchParams.get("page") || "1", 10);

    const movies = await getDiscoverMovies(genre, lang, page);
    return NextResponse.json(movies);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error fetching movies" },
      { status: 500 }
    );
  }
}
