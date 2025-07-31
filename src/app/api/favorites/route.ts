import { authOptions } from "@/lib/auth/authOptions";
import {
  addMovieToFavorites,
  getUserFavorites,
  removeMovieFromFavorites,
} from "@/lib/controllers/userListController";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const favorites = await getUserFavorites(session.user.id);

    if (!favorites) {
      return NextResponse.json(
        { error: "Favorites not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(favorites, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { movieData } = body;
    const userId = session.user.id;

    const result = await addMovieToFavorites(userId, movieData);

    return NextResponse.json(
      result.added
        ? { message: "Movie added to favorites" }
        : { message: "Already in favorites" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error adding to favorites:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { movieId } = body;
    const userId = session.user.id;

    await removeMovieFromFavorites(userId, movieId);

    return NextResponse.json(
      { message: "Movie removed from favorites" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error removing from favorites:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
