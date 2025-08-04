import { getMovieProviders } from "@/lib/controllers/movieController";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id;
    const { searchParams } = new URL(req.url);
    const country = searchParams.get("country") || "US";
    const movies = await getMovieProviders(Number(id), country);

    return NextResponse.json(movies);
  } catch (error) {
    console.error("Error fetching movie providers:", error);
    return NextResponse.json(
      { error: "Failed to fetch movie providers" },
      { status: 500 }
    );
  }
}
