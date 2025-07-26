import { getMoviesByQuery } from "@/lib/controllers/searchController";
import { NextRequest, NextResponse } from "next/server";

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

    const results = await getMoviesByQuery(query, page, language);
    return NextResponse.json(results);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error fetching movies" },
      { status: 500 }
    );
  }
}
