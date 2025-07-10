import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default function middleware(req: NextRequest) {
  const res = NextResponse.next();

  let country = "SE";
  let language = "sv";

  if (process.env.VERCEL === "1") {
    country = req.headers.get("x-vercel-ip-country") || country;
    language = req.headers.get("x-vercel-ip-language") || language;
  }

  const bcp47 = `${language.toLowerCase()}-${country.toUpperCase()}`;

  res.cookies.set("userCountry", country);
  res.cookies.set("userLanguage", bcp47);

  return res;
}
