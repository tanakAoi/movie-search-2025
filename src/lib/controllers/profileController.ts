import { NextRequest } from "next/server";
import { prisma } from "../db/prisma";
import { moviedb } from "../tmdb/tmdb";
import { tr } from "motion/react-client";

export async function getProfile(userId: string) {
  const profile = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      username: true,
      email: true,
      country: true,
      language: true,
      avatar: true,
    },
  });
  return profile;
}

export async function updateProfile(req: NextRequest, userId: string) {
  const { country, language, username, avatar } = (await req.json()) as {
    country?: string;
    language?: string;
    username?: string;
    avatar?: string;
  };

  const result = await prisma.user.update({
    where: { id: userId },
    data: { country, language, username, avatar },
  });

  return result;
}

export async function fetchCountries() {
  try {
    const countries = await moviedb.countries();
    if (!countries) {
      throw new Error("No countries found");
    }

    return countries;
  } catch (error) {
    console.error("Error fetching countries:", error);
    throw error;
  }
}

export async function fetchLanguages() {
  try {
    const languages = await moviedb.languages();
    if (!languages) {
      throw new Error("No languages found");
    }

    return languages;
  } catch (error) {
    console.error("Error fetching languages:", error);
    throw error;
  }
}
