import { NextResponse } from "next/server";
import { getPopularMovies } from "@/lib/controllers/movieController";

export async function GET() {
  try {
    const movies = await getPopularMovies();
    return NextResponse.json(movies);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error fetching movies" },
      { status: 500 }
    );
  }
}
