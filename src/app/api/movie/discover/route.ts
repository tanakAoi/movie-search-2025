import { NextRequest, NextResponse } from "next/server";
import { getDiscoverMovies } from "@/lib/controllers/movieController";
import { DiscoverMovieOptions } from "@/types/discoverParams";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const lang = searchParams.get("lang") || "";
    const page = parseInt(searchParams.get("page") || "1", 10);

    const query: DiscoverMovieOptions = {
      lang,
      page,
    };

    const optionalKeys = ["genre", "person"];
    for (const key of optionalKeys) {
      const value = searchParams.get(key);
      if (value) {
        if (key === "genre") query.with_genres = value;
        if (key === "person") {
          query.with_cast = value;
          query.sort_by = "primary_release_date.desc";
        }
      }
    }

    const movies = await getDiscoverMovies(query);
    return NextResponse.json(movies);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error fetching movies" },
      { status: 500 }
    );
  }
}
