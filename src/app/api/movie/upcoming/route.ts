import { getUpcomingMovies } from "@/lib/controllers/movieController";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const movies = await getUpcomingMovies();
    return NextResponse.json(movies);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error fetching movies" },
      { status: 500 }
    );
  }
}
