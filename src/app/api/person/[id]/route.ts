import { getPersonDetails } from "@/lib/controllers/personController";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { searchParams } = new URL(req.url);
  const lang = searchParams.get("lang") || "en-US";

  try {
    const personData = await getPersonDetails(id, lang);
    if (!personData) {
      return NextResponse.json(
        { message: `Person with id ${id} not found` },
        { status: 404 }
      );
    }

    return NextResponse.json(personData);
  } catch (error) {
    console.error(`Error fetching person details for id ${id}:`, error);
    return NextResponse.json(
      { error: "Failed to fetch person details" },
      { status: 500 }
    );
  }
}
