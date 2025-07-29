import { getCompanyDetails } from "@/lib/controllers/companyController";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { searchParams } = new URL(req.url);
  const lang = searchParams.get("lang") || "en-US";

  try {
    const companyData = await getCompanyDetails(id, lang);
    if (!companyData) {
      return NextResponse.json(
        { message: `Company with id ${id} not found` },
        { status: 404 }
      );
    }

    return NextResponse.json(companyData);
  } catch (error) {
    console.error(`Error fetching company details for id ${id}:`, error);
    return NextResponse.json(
      { error: "Failed to fetch company details" },
      { status: 500 }
    );
  }
}
