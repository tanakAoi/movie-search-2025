import { NextRequest, NextResponse } from "next/server";
import { getMoviesByKeyword } from "@/lib/controllers/movieController";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q") || "";
    const page = searchParams.get("page")
      ? parseInt(searchParams.get("page") as string, 10)
      : 1;
    const language = searchParams.get("lang") || "";

    if (!query) {
      return NextResponse.json(
        { message: "Query parameter 'q' is required" },
        { status: 400 }
      );
    }

    const movies = await getMoviesByKeyword(query, page, language);
    return NextResponse.json(movies);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error fetching movies" },
      { status: 500 }
    );
  }
}
