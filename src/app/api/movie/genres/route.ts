import { NextRequest, NextResponse } from "next/server";
import { getGenres, getPopularMovies } from "@/lib/controllers/movieController";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const lang = searchParams.get("lang") || "";

    const genres = await getGenres(lang);
    return NextResponse.json(genres);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error fetching genres" },
      { status: 500 }
    );
  }
}
