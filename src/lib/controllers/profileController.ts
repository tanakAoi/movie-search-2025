import { NextRequest } from "next/server";
import { prisma } from "../db/prisma";

export async function getProfile(userId: string) {
  const profile = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      username: true,
      email: true,
      country: true,
      language: true,
    },
  });
  return profile;
}

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
