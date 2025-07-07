import { NextRequest } from "next/server";
import { prisma } from "../db/prisma";

export async function updateProfile(req: NextRequest, userId: string) {
  const { country, language, username } = (await req.json()) as {
    country?: string;
    language?: string;
    username?: string;
  };

  const result = await prisma.user.update({
    where: { id: userId },
    data: { country, language, username },
  });

  return result;
}
