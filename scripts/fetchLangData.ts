const fs = require("fs");
const path = require("path");
require("dotenv").config();

const TMDB_API_KEY = process.env.TMDB_API_KEY;

if (!TMDB_API_KEY) {
  throw new Error("TMDB_API_KEY is not set in environment variables.");
}

const BASE_URL = "https://api.themoviedb.org/3/configuration";
const outputDir = path.resolve("public/data");
const outputPath = path.join(outputDir, "lang.json");
const CACHE_DURATION_HOURS = 168; // 7 days

async function fetchLanguages() {
  try {
    if (fs.existsSync(outputPath)) {
      const stats = fs.statSync(outputPath);
      const lastModified = new Date(stats.mtime);
      const now = new Date();

      const hoursSinceLastUpdate =
        (now.getTime() - lastModified.getTime()) / (1000 * 60 * 60);

      if (hoursSinceLastUpdate < CACHE_DURATION_HOURS) {
        console.log(
          `⏳ lang.json is up-to-date (${hoursSinceLastUpdate.toFixed(
            1
          )}h ago). Skipping fetch.`
        );
        return;
      }
    }

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const res = await fetch(`${BASE_URL}/languages?api_key=${TMDB_API_KEY}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();

    fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
    console.log("✅ lang.json updated and saved.");
  } catch (error) {
    console.error("❌ Error fetching languages:", error);
  }
}

fetchLanguages();
