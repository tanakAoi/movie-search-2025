import { authOptions } from "@/lib/auth/authOptions";
import {
  addMovieToWatchlist,
  getUserWatchlist,
  removeMovieFromWatchlist,
} from "@/lib/controllers/userListController";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const watchlist = await getUserWatchlist(session.user.id);

    if (!watchlist) {
      return NextResponse.json(
        { error: "Watchlist not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(watchlist, { status: 200 });
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

    const result = await addMovieToWatchlist(userId, movieData);

    return NextResponse.json(
      result.added
        ? { message: "Movie added to watchlist" }
        : { message: "Already in watchlist" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error adding to watchlist:", err);
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

    await removeMovieFromWatchlist(userId, movieId);

    return NextResponse.json(
      { message: "Movie removed from watchlist" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error removing from watchlist:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
