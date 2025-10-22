import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWallet,
  faCalendarDay,
  faClock,
  faGlobe,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import "./MovieDetailsSmallStyles.css";
import "./MovieDetailsEnhanced.css";
import { getMonthName, getYearShort } from "../../utils/Misc/dateTime";
import { MuviLogo, Tag } from "../../components";

const baseUrl = "https://image.tmdb.org/t/p/original";

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

function MovieDetails({
  movieDetails,
  movieCredits,
  watchProviders,
  videos,
  keywords,
  externalIds,
}) {
  const [selectedVideo, setSelectedVideo] = useState(null);

  const posterUrl = baseUrl + movieDetails?.backdrop_path;
  const title = movieDetails?.title;
  const rate = movieDetails?.vote_average;
  const genre = movieDetails?.genres[0]?.name;
  const overview = movieDetails?.overview;
  const releaseDate = movieDetails?.release_date?.split("-");
  const company = movieDetails?.production_companies[0];
  const status = movieDetails?.status;
  const originalLanguage = movieDetails?.original_language?.toUpperCase();
  const budget = movieDetails?.budget;
  const revenue = movieDetails?.revenue;
  const homepage = movieDetails?.homepage;

  // SEO Meta data
  const releaseYear = releaseDate ? releaseDate[0] : "";
  const movieTitle = title ? `${title} (${releaseYear})` : "Película";
  const movieDescription = overview
    ? overview.length > 155
      ? overview.substring(0, 155) + "..."
      : overview
    : `Ver ${title} online. Información completa, reparto, trailers y dónde ver en streaming.`;
  const movieImage = movieDetails?.poster_path
    ? `https://image.tmdb.org/t/p/w780${movieDetails.poster_path}`
    : "https://vermuvi.com/muvi-logo.png";
  const movieUrl = `https://vermuvi.com/movie/${movieDetails?.id}`;

  // Generate keywords from genres and keywords
  const genreKeywords =
    movieDetails?.genres?.map((g) => g.name).join(", ") || "";
  const movieKeywords =
    keywords?.keywords
      ?.slice(0, 5)
      .map((k) => k.name)
      .join(", ") || "";
  const allKeywords = `${title}, película, ${genreKeywords}, ${movieKeywords}, ver online, streaming`;

  // Cast for Schema.org
  const mainCast = movieCredits?.cast?.slice(0, 5) || [];

  // Director for Schema.org
  const director = movieCredits?.crew?.find((c) => c.job === "Director");

  document.title = `${movieTitle} | Ver Muvi - Películas Online`;

  const info = [
    {
      icon: faClock,
      text: Math.ceil(movieDetails?.runtime / 60) + "Hs",
    },
    {
      icon: faCalendarDay,
      text: `${getMonthName(releaseDate && releaseDate[1])} ${
        releaseDate && releaseDate[2]
      } ${getYearShort(releaseDate && releaseDate[0])} `,
    },
    {
      icon: faWallet,
      text: budget > 0 ? formatter.format(budget).split(",")[0] + "M" : "N/A",
    },
  ];

  // Get US watch providers
  const usProviders = watchProviders?.results?.US;
  const streamProviders = usProviders?.flatrate || [];
  const rentProviders = usProviders?.rent || [];
  const buyProviders = usProviders?.buy || [];
  const allProviders = [...streamProviders, ...rentProviders, ...buyProviders];
  const uniqueProviders = allProviders.filter(
    (provider, index, self) =>
      index === self.findIndex((p) => p.provider_id === provider.provider_id)
  );

  const trailers = videos?.results?.filter((v) => v.type === "Trailer") || [];

  const handleWatchProviderClick = () => {
    if (usProviders?.link) {
      window.open(usProviders.link, "_blank");
    }
  };

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
  };

  const handleIMDbClick = () => {
    if (externalIds?.imdb_id) {
      window.open(
        `https://www.imdb.com/title/${externalIds.imdb_id}`,
        "_blank"
      );
    }
  };

  const handleHomepageClick = () => {
    if (homepage) {
      window.open(homepage, "_blank");
    }
  };

  // Schema.org JSON-LD
  const schemaOrgData = movieDetails
    ? {
        "@context": "https://schema.org",
        "@type": "Movie",
        name: title,
        description: overview,
        image: movieImage,
        datePublished: movieDetails.release_date,
        genre: movieDetails.genres?.map((g) => g.name),
        duration: `PT${movieDetails.runtime}M`,
        aggregateRating: rate
          ? {
              "@type": "AggregateRating",
              ratingValue: rate,
              ratingCount: movieDetails.vote_count,
              bestRating: 10,
              worstRating: 0,
            }
          : undefined,
        director: director
          ? {
              "@type": "Person",
              name: director.name,
            }
          : undefined,
        actor: mainCast.map((actor) => ({
          "@type": "Person",
          name: actor.name,
        })),
        url: movieUrl,
        inLanguage: movieDetails.original_language,
        contentRating: movieDetails.adult ? "R" : "PG-13",
      }
    : null;

  return (
    <div id={"movieDetails"}>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>{`${movieTitle} | Ver Muvi - Películas Online`}</title>
        <meta
          name="title"
          content={`${movieTitle} | Ver Muvi - Películas Online`}
        />
        <meta name="description" content={movieDescription} />
        <meta name="keywords" content={allKeywords} />
        <link rel="canonical" href={movieUrl} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="video.movie" />
        <meta property="og:url" content={movieUrl} />
        <meta property="og:title" content={movieTitle} />
        <meta property="og:description" content={movieDescription} />
        <meta property="og:image" content={movieImage} />
        <meta property="og:image:width" content="780" />
        <meta property="og:image:height" content="1170" />
        <meta property="og:site_name" content="Ver Muvi" />
        {releaseDate && (
          <meta
            property="og:video:release_date"
            content={movieDetails.release_date}
          />
        )}

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={movieUrl} />
        <meta name="twitter:title" content={movieTitle} />
        <meta name="twitter:description" content={movieDescription} />
        <meta name="twitter:image" content={movieImage} />

        {/* Schema.org JSON-LD */}
        {schemaOrgData && (
          <script type="application/ld+json">
            {JSON.stringify(schemaOrgData)}
          </script>
        )}
      </Helmet>

      <div
        className={"details-poster-sm"}
        style={{ backgroundImage: `url(${posterUrl})` }}
      >
        <div className={"movie-overlay flex-column"}>
          <div className={"movie-overlay-details"}>
            {rate && (
              <div className={"card-rate"}>
                <i className={`icon-star-contain`} />
                {rate.toFixed(1)}
              </div>
            )}
            {title && (
              <motion.div
                className={"card-title"}
                style={{ lineHeight: "1em", margin: 0 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {title}
              </motion.div>
            )}
            {genre && <div className={"card-genre"}>{genre}</div>}
            <div className={"details-company-sm flex-row flex-center shadow"}>
              {company?.logo_path ? (
                <img
                  src={baseUrl + company?.logo_path}
                  alt={company?.name + " logo"}
                />
              ) : (
                <MuviLogo />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className={"details-overview-sm flex-column flex-center"}>
        {overview && <p>{overview}</p>}

        <div className={"details-tags-sm flex-row"}>
          {info.map((data, index) => {
            return (
              <span
                key={index}
                className={"details-tag"}
                style={{ ...data.style }}
              >
                <FontAwesomeIcon icon={data.icon} />
                <span className={"details-tag-text"} style={{ ...data.style }}>
                  {data.text}
                </span>
              </span>
            );
          })}
        </div>

        {/* Additional Info */}
        <div className="movie-additional-info">
          {status && (
            <div className="info-item">
              <span className="info-label">Status:</span>
              <span className="info-value">{status}</span>
            </div>
          )}
          {originalLanguage && (
            <div className="info-item">
              <span className="info-label">Language:</span>
              <span className="info-value">{originalLanguage}</span>
            </div>
          )}
          {revenue > 0 && (
            <div className="info-item">
              <span className="info-label">Revenue:</span>
              <span className="info-value">
                {formatter.format(revenue).split(",")[0]}M
              </span>
            </div>
          )}
        </div>

        {/* External Links */}
        <div className="external-links">
          {externalIds?.imdb_id && (
            <motion.button
              className="external-link-btn"
              onClick={handleIMDbClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FontAwesomeIcon icon={faGlobe} />
              <span>IMDb</span>
            </motion.button>
          )}
          {homepage && (
            <motion.button
              className="external-link-btn"
              onClick={handleHomepageClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FontAwesomeIcon icon={faGlobe} />
              <span>Homepage</span>
            </motion.button>
          )}
        </div>

        {/* Watch Providers */}
        {uniqueProviders.length > 0 && (
          <motion.div
            className="watch-providers-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3>Where to Watch</h3>
            <div className="providers-grid">
              {uniqueProviders.slice(0, 6).map((provider) => (
                <motion.div
                  key={provider.provider_id}
                  className="provider-item"
                  whileHover={{ scale: 1.1 }}
                  onClick={handleWatchProviderClick}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w92${provider.logo_path}`}
                    alt={provider.provider_name}
                    title={provider.provider_name}
                  />
                </motion.div>
              ))}
            </div>
            {usProviders?.link && (
              <motion.button
                className="watch-now-btn"
                onClick={handleWatchProviderClick}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FontAwesomeIcon icon={faPlay} />
                <span>View All Options</span>
              </motion.button>
            )}
          </motion.div>
        )}

        {/* Keywords */}
        {keywords?.keywords && keywords.keywords.length > 0 && (
          <div className="keywords-section">
            <h3>Keywords</h3>
            <div className="keywords-list">
              {keywords.keywords.slice(0, 10).map((keyword) => (
                <Tag key={keyword.id} text={keyword.name} />
              ))}
            </div>
          </div>
        )}

        {/* Trailers */}
        {trailers.length > 0 && (
          <motion.div
            className="trailers-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3>Trailers & Videos</h3>
            <div className="trailers-grid">
              {trailers.slice(0, 4).map((video) => (
                <motion.div
                  key={video.id}
                  className="trailer-item"
                  onClick={() => handleVideoClick(video)}
                  whileHover={{ scale: 1.05 }}
                >
                  <img
                    src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`}
                    alt={video.name}
                  />
                  <div className="trailer-overlay">
                    <FontAwesomeIcon icon={faPlay} />
                  </div>
                  <p>{video.name}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Video Modal */}
        {selectedVideo && (
          <motion.div
            className="video-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setSelectedVideo(null)}
          >
            <div
              className="video-modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="video-modal-close"
                onClick={() => setSelectedVideo(null)}
              >
                ×
              </button>
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${selectedVideo.key}?autoplay=1`}
                title={selectedVideo.name}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </motion.div>
        )}

        {/* Production Companies */}
        {movieDetails?.production_companies &&
          movieDetails.production_companies.length > 1 && (
            <div className="production-companies">
              <h3>Production Companies</h3>
              <div className="companies-grid">
                {movieDetails.production_companies.map((comp) => (
                  <div key={comp.id} className="company-item">
                    {comp.logo_path ? (
                      <img src={baseUrl + comp.logo_path} alt={comp.name} />
                    ) : (
                      <span>{comp.name}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
      </div>
    </div>
  );
}

export default MovieDetails;
