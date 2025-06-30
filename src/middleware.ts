import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  const isVercel = process.env.VERCEL === "1";

  let country = "US";
  let language = "en-US";

  if (isVercel) {
    country = request.headers.get("x-vercel-ip-country") || country;
    language = request.headers.get("x-vercel-ip-language") || language;
  } else {
    try {
      const ipapiRes = await fetch("https://ipapi.co/json");
      
      if (ipapiRes.ok) {
        const data = await ipapiRes.json();
        country = data.country_code || country;
        language = data.languages[0] || language;
      }
    } catch {
      console.error("Failed to fetch country from ipapi");
    }
  }

  response.cookies.set("userCountry", country);
  response.cookies.set("userLanguage", language);

  return response;
}
