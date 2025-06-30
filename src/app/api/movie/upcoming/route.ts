import { getUpcomingMovies } from "@/lib/controllers/movieController";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const country = request.headers.get("X-country");
    const movies = await getUpcomingMovies(country);
    return NextResponse.json(movies);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error fetching movies" },
      { status: 500 }
    );
  }
}
