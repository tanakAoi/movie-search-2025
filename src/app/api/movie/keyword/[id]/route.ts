import { getKeywordDetails } from "@/lib/controllers/movieController";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { searchParams } = new URL(req.url);
    const lang = searchParams.get("lang") || "";
    const keywordId = (await params).id;

    const movies = await getKeywordDetails(keywordId, lang);
    return NextResponse.json(movies);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error fetching keyword details" },
      { status: 500 }
    );
  }
}
