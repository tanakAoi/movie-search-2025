import { NextRequest, NextResponse } from "next/server";
import { getDiscoverMovies } from "@/lib/controllers/movieController";
import { DiscoverMovieOptions } from "@/types/discover-params";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const lang = searchParams.get("lang") || "";
    const page = parseInt(searchParams.get("page") || "1", 10);

    const query: DiscoverMovieOptions = {
      lang,
      page,
    };

    const optionalKeys = [
      "genre",
      "cast",
      "crew",
      "keyword",
      "company",
      "country",
    ];
    for (const key of optionalKeys) {
      const value = searchParams.get(key);
      if (value) {
        if (key === "genre") query.with_genres = value;
        if (key === "cast") {
          query.with_cast = value;
          query.sort_by = "primary_release_date.desc";
        }
        if (key === "crew") {
          query.with_crew = value;
          query.sort_by = "primary_release_date.desc";
        }
        if (key === "keyword") query.with_keywords = value;
        if (key === "company") {
          query.with_companies = value;
          query.sort_by = "vote_count.desc";
        }
        if (key === "country") {
          query.with_origin_country = value;
          query.sort_by = "vote_count.desc";
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
