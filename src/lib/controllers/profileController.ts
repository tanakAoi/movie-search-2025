import { NextRequest } from "next/server";
import { prisma } from "../db/prisma";
import { tmdbFetch } from "../tmdbFetcher";
import { ICountry, ILanguage } from "@/types/tmdb";

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
    country?: ICountry;
    language?: ILanguage;
    username?: string;
    avatar?: string;
  };

  const result = await prisma.user.update({
    where: { id: userId },
    data: {
      country: {
        iso_3166_1: country?.iso_3166_1,
        english_name: country?.english_name,
        native_name: country?.native_name,
      },
      language: {
        iso_639_1: language?.iso_639_1,
        english_name: language?.english_name,
        name: language?.name,
      },
      username,
      avatar,
    },
  });

  return result;
}

export async function fetchLanguages() {
  try {
    const response = await tmdbFetch("/configuration/languages");
    return response;
  } catch (error) {
    console.error("Error fetching languages:", error);
    throw error;
  }
}

export async function fetchCountries(lang: string) {
  try {
    const countries = await tmdbFetch("/configuration/countries", {
      language: lang,
    });
    return countries;
  } catch (error) {
    console.error("Error fetching countries:", error);
    throw error;
  }
}
