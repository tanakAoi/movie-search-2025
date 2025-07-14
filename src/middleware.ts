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

  if (!req.cookies.get("userCountry")) {
    res.cookies.set("userCountry", country);
  }
  if (!req.cookies.get("userLanguage")) {
    res.cookies.set("userLanguage", language);
  }

  return res;
}
