import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";
import { updateProfile } from "@/lib/controllers/profileController";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const result = await updateProfile(req, (await params).id);
    if (result.modifiedCount === 0) {
      return new NextResponse("No changes made", { status: 200 });
    }
    return new NextResponse("Profile updated", { status: 200 });
  } catch (err) {
    console.error(err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
