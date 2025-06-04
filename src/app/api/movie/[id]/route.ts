import { getMovieDetails } from "@/lib/controllers/movieController";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  const movieDetails = await getMovieDetails(id);

  return NextResponse.json(movieDetails);
}
