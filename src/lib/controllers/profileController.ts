import { NextRequest } from "next/server";
import clientPromise from "@/lib/db/mongodb";
import { ObjectId } from "mongodb";

export async function updateProfile(
  req: NextRequest,
  userId: string
) {
  const { country, language, username } = (await req.json()) as {
    country?: string;
    language?: string;
    username?: string;
  };

  const client = await clientPromise;
  const db = client.db();

  const result = await db
    .collection("users")
    .updateOne(
      { _id: new ObjectId(userId) },
      { $set: { country, language, username } }
    );

  return result;
}
