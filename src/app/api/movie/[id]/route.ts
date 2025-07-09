import {
  getMovieDetailsFromTmdb,
  getMovieDetailsFromOmdb,
} from "@/lib/controllers/movieController";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  const { searchParams } = new URL(req.url);
  const lang = searchParams.get("lang") || "en-US";
  const tmdb = await getMovieDetailsFromTmdb(id, lang);
  if (!tmdb || !tmdb.imdb_id) {
    return NextResponse.json(
      { error: "Movie details not found or IMDb ID is missing" },
      { status: 404 }
    );
  }

  const omdb = await getMovieDetailsFromOmdb(tmdb.imdb_id);
  const scores = [
    ...(omdb?.Ratings ?? []),
    {
      source: "tmdb",
      value: `${tmdb.vote_average}`,
    },
  ];

  const sourceMapping: Record<string, string> = {
    "internet movie database": "IMDb",
    "rotten tomatoes": "Rotten Tomatoes",
    metacritic: "Metacritic",
    tmdb: "TMDb",
  };

  const normalizedScores = scores
    .map(({ Source, Value, source, value }) => {
      const src = (Source || source)?.toLowerCase();
      const val = Value || value;

      const normalizedSource = sourceMapping[src] ?? src?.toUpperCase();
      if (!normalizedSource) return null;

      let score = 0;

      if (val.includes("%")) {
        score = parseFloat(val) / 10;
      } else if (val.includes("/100")) {
        score = parseFloat(val) / 10;
      } else if (val.includes("/10")) {
        score = parseFloat(val);
      } else {
        score = parseFloat(val);
      }

      return {
        source: normalizedSource,
        value: score,
      };
    })
    .filter((s) => s !== null);

  const movieDetails = {
    ...tmdb,
    scores: normalizedScores ?? [],
  };

  return NextResponse.json(movieDetails);
}
