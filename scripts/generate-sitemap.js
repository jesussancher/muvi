const fs = require("fs");
const path = require("path");

// Load environment variables
require("dotenv").config();

const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const TMDB_ACCESS_TOKEN = process.env.REACT_APP_TMDB_ACCESS_TOKEN;
const BASE_URL = "https://vermuvi.com";

// Function to fetch data from TMDB
async function fetchTMDB(endpoint) {
  const url = `https://api.themoviedb.org/3${endpoint}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
    },
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error.message);
    return null;
  }
}

// Fetch popular movies across multiple pages
async function fetchPopularMovies(pages = 50) {
  console.log(`Fetching popular movies (${pages} pages)...`);
  const movies = [];

  for (let page = 1; page <= pages; page++) {
    const data = await fetchTMDB(`/movie/popular?language=en-US&page=${page}`);
    if (data && data.results) {
      movies.push(...data.results);
    }
    // Rate limiting
    await new Promise((resolve) => setTimeout(resolve, 250));
  }

  console.log(`Found ${movies.length} popular movies`);
  return movies;
}

// Fetch top-rated movies across multiple pages
async function fetchTopRatedMovies(pages = 25) {
  console.log(`Fetching top-rated movies (${pages} pages)...`);
  const movies = [];

  for (let page = 1; page <= pages; page++) {
    const data = await fetchTMDB(
      `/movie/top_rated?language=en-US&page=${page}`
    );
    if (data && data.results) {
      movies.push(...data.results);
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }

  console.log(`Found ${movies.length} top-rated movies`);
  return movies;
}

// Fetch popular TV series across multiple pages
async function fetchPopularTV(pages = 25) {
  console.log(`Fetching popular TV series (${pages} pages)...`);
  const tvShows = [];

  for (let page = 1; page <= pages; page++) {
    const data = await fetchTMDB(`/tv/popular?language=en-US&page=${page}`);
    if (data && data.results) {
      tvShows.push(...data.results);
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }

  console.log(`Found ${tvShows.length} popular TV series`);
  return tvShows;
}

// Fetch top-rated TV series
async function fetchTopRatedTV(pages = 25) {
  console.log(`Fetching top-rated TV series (${pages} pages)...`);
  const tvShows = [];

  for (let page = 1; page <= pages; page++) {
    const data = await fetchTMDB(`/tv/top_rated?language=en-US&page=${page}`);
    if (data && data.results) {
      tvShows.push(...data.results);
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }

  console.log(`Found ${tvShows.length} top-rated TV series`);
  return tvShows;
}

// Generate sitemap XML
function generateSitemap(movies, tvShows) {
  const currentDate = new Date().toISOString().split("T")[0];

  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
  
  <!-- Home Page -->
  <url>
    <loc>${BASE_URL}/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  
  <!-- TV Series Page -->
  <url>
    <loc>${BASE_URL}/tv</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  
  <!-- Favorites Page -->
  <url>
    <loc>${BASE_URL}/favorites</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
`;

  // Add movie pages
  const uniqueMovies = [...new Map(movies.map((m) => [m.id, m])).values()];
  console.log(`Adding ${uniqueMovies.length} unique movies to sitemap...`);

  uniqueMovies.forEach((movie) => {
    const releaseDate = movie.release_date || currentDate;
    const priority =
      movie.popularity > 100 ? "0.9" : movie.popularity > 50 ? "0.8" : "0.7";

    sitemap += `  <url>
    <loc>${BASE_URL}/movie/${movie.id}</loc>
    <lastmod>${releaseDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${priority}</priority>
  </url>
`;
  });

  // Add TV series pages
  const uniqueTV = [...new Map(tvShows.map((tv) => [tv.id, tv])).values()];
  console.log(`Adding ${uniqueTV.length} unique TV series to sitemap...`);

  uniqueTV.forEach((tv) => {
    const firstAirDate = tv.first_air_date || currentDate;
    const priority =
      tv.popularity > 100 ? "0.9" : tv.popularity > 50 ? "0.8" : "0.7";

    sitemap += `  <url>
    <loc>${BASE_URL}/tv/${tv.id}</loc>
    <lastmod>${firstAirDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${priority}</priority>
  </url>
`;
  });

  sitemap += `</urlset>`;

  return sitemap;
}

// Main function
async function main() {
  console.log("Starting sitemap generation...");
  console.log("=================================");

  if (!TMDB_API_KEY && !TMDB_ACCESS_TOKEN) {
    console.error("ERROR: TMDB API credentials not found!");
    console.error(
      "Please set REACT_APP_TMDB_API_KEY or REACT_APP_TMDB_ACCESS_TOKEN in your .env file"
    );
    process.exit(1);
  }

  try {
    // Fetch all data
    const [popularMovies, topRatedMovies, popularTV, topRatedTV] =
      await Promise.all([
        fetchPopularMovies(50),
        fetchTopRatedMovies(25),
        fetchPopularTV(25),
        fetchTopRatedTV(25),
      ]);

    const allMovies = [...popularMovies, ...topRatedMovies];
    const allTV = [...popularTV, ...topRatedTV];

    // Generate sitemap
    console.log("=================================");
    console.log("Generating sitemap XML...");
    const sitemapXML = generateSitemap(allMovies, allTV);

    // Save to public directory
    const publicDir = path.join(__dirname, "..", "public");
    const sitemapPath = path.join(publicDir, "sitemap.xml");

    fs.writeFileSync(sitemapPath, sitemapXML, "utf8");

    console.log("=================================");
    console.log(`✓ Sitemap generated successfully!`);
    console.log(`  Location: ${sitemapPath}`);
    console.log(`  Total URLs: ${allMovies.length + allTV.length + 3}`);
    console.log(`  - Movies: ${allMovies.length}`);
    console.log(`  - TV Series: ${allTV.length}`);
    console.log(`  - Static pages: 3`);
    console.log("=================================");
  } catch (error) {
    console.error("Error generating sitemap:", error);
    process.exit(1);
  }
}

// Run the script
main();
