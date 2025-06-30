import { NextRequest, NextResponse } from "next/server";
import { getPopularMovies } from "@/lib/controllers/movieController";

export async function GET(request: NextRequest) {
  try {
    const country = request.headers.get("X-country");
    const movies = await getPopularMovies(country);
    return NextResponse.json(movies);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error fetching movies" },
      { status: 500 }
    );
  }
}
