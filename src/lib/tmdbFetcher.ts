// src/lib/tmdb/fetcher.ts
const BASE_URL = "https://api.themoviedb.org/3";

const TMDB_HEADERS = {
  accept: "application/json",
  Authorization: `Bearer ${process.env.API_TOKEN}`,
};

export async function tmdbFetch(path: string, params?: Record<string, string | number>) {
  const url = new URL(`${BASE_URL}${path}`);
  if (params) {
    Object.entries(params).forEach(([key, value]) =>
      url.searchParams.append(key, value.toString())
    );
  }

  const res = await fetch(url.toString(), {
    method: "GET",
    headers: TMDB_HEADERS,
  });

  if (!res.ok) {
    throw new Error(`TMDB fetch failed: ${res.statusText}`);
  }

  return res.json();
}
