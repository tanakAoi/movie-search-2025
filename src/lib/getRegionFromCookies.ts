import { cookies } from "next/headers";

export async function getRegionFromCookies() {
  const cookieStore = await cookies();

  const userCountry = cookieStore.get("userCountry")?.value || "";
  const userLanguage = cookieStore.get("userLanguage")?.value || "";

  return { country: userCountry, language: userLanguage };
}
