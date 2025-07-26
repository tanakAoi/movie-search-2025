import { getMovieKeywords } from "@/lib/controllers/movieController";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id;
    const { searchParams } = new URL(req.url);
    const lang = searchParams.get("lang") || "en-US";
    const movies = await getMovieKeywords(Number(id), lang);

    return NextResponse.json(movies);
  } catch (error) {
    console.error("Error fetching movie keywords:", error);
    return NextResponse.json(
      { error: "Failed to fetch movie keywords" },
      { status: 500 }
    );
  }
}
