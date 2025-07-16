import {
  getSimilarMovies,
} from "@/lib/controllers/movieController";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id;
    const { searchParams } = new URL(req.url);
    const lang = searchParams.get("lang") || "en-US";
    const movies = await getSimilarMovies(Number(id), lang);

    return NextResponse.json(movies);
  } catch (error) {
    console.error("Error fetching similar movies:", error);
    return NextResponse.json(
      { error: "Failed to fetch similar movies" },
      { status: 500 }
    );
  }
}
