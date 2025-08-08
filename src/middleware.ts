import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default function middleware(req: NextRequest) {
  const res = NextResponse.next();

  let country = "US";
  let language = "en";

  if (process.env.VERCEL === "1") {
    country = req.headers.get("x-vercel-ip-country") || country;
    const ipLanguage = req.headers.get("x-vercel-ip-language");
    if (ipLanguage) {
      language = ipLanguage.split("-")[0];
    }
  }

  if (!req.cookies.get("userCountry")) {
    res.cookies.set("userCountry", country);
  }
  if (!req.cookies.get("userLanguage")) {
    res.cookies.set("userLanguage", language);
  }

  return res;
}
