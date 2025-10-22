import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDay,
  faTv,
  faStar,
  faGlobe,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import "../Details/MovieDetailsSmallStyles.css";
import "../Details/MovieDetailsEnhanced.css";
import "./TVSeriesDetailsStyles.css";
import { getMonthName, getYearShort } from "../../utils/Misc/dateTime";
import { MuviLogo, Tag } from "../../components";

const baseUrl = "https://image.tmdb.org/t/p/original";

function TVSeriesDetails({
  tvDetails,
  watchProviders,
  videos,
  keywords,
  externalIds,
}) {
  const [selectedVideo, setSelectedVideo] = useState(null);

  const posterUrl = baseUrl + tvDetails?.backdrop_path;
  const title = tvDetails?.name;
  const rate = tvDetails?.vote_average;
  const genre = tvDetails?.genres && tvDetails?.genres[0]?.name;
  const overview = tvDetails?.overview;
  const firstAirDate = tvDetails?.first_air_date?.split("-");
  const network = tvDetails?.networks && tvDetails?.networks[0];
  const numberOfSeasons = tvDetails?.number_of_seasons;
  const numberOfEpisodes = tvDetails?.number_of_episodes;
  const status = tvDetails?.status;
  const originalLanguage = tvDetails?.original_language?.toUpperCase();
  const homepage = tvDetails?.homepage;

  // SEO Meta data
  const firstAirYear = firstAirDate ? firstAirDate[0] : "";
  const tvTitle = title ? `${title} (${firstAirYear})` : "Serie";
  const tvDescription = overview
    ? overview.length > 155
      ? overview.substring(0, 155) + "..."
      : overview
    : `Ver ${title} online. Información completa, reparto, trailers y dónde ver en streaming.`;
  const tvImage = tvDetails?.poster_path
    ? `https://image.tmdb.org/t/p/w780${tvDetails.poster_path}`
    : "https://vermuvi.com/muvi-logo.png";
  const tvUrl = `https://vermuvi.com/tv/${tvDetails?.id}`;

  // Generate keywords from genres and keywords
  const genreKeywords = tvDetails?.genres?.map((g) => g.name).join(", ") || "";
  const tvKeywords =
    keywords?.results
      ?.slice(0, 5)
      .map((k) => k.name)
      .join(", ") || "";
  const allKeywords = `${title}, serie, ${genreKeywords}, ${tvKeywords}, ver online, streaming`;

  document.title = `${tvTitle} | Ver Muvi - Series Online`;

  const info = [
    {
      icon: faTv,
      text: `${numberOfSeasons || 0} Season${numberOfSeasons !== 1 ? "s" : ""}`,
    },
    {
      icon: faCalendarDay,
      text: `${getMonthName(firstAirDate && firstAirDate[1])} ${
        firstAirDate && firstAirDate[2]
      } ${getYearShort(firstAirDate && firstAirDate[0])} `,
    },
    {
      icon: faStar,
      text: status || "Unknown",
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

  // Schema.org JSON-LD for TV Series
  const schemaOrgData = tvDetails
    ? {
        "@context": "https://schema.org",
        "@type": "TVSeries",
        name: title,
        description: overview,
        image: tvImage,
        datePublished: tvDetails.first_air_date,
        genre: tvDetails.genres?.map((g) => g.name),
        numberOfSeasons: numberOfSeasons,
        numberOfEpisodes: numberOfEpisodes,
        aggregateRating: rate
          ? {
              "@type": "AggregateRating",
              ratingValue: rate,
              ratingCount: tvDetails.vote_count,
              bestRating: 10,
              worstRating: 0,
            }
          : undefined,
        url: tvUrl,
        inLanguage: tvDetails.original_language,
        contentRating: tvDetails.adult ? "TV-MA" : "TV-PG",
      }
    : null;

  return (
    <div id={"movieDetails"}>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>{`${tvTitle} | Ver Muvi - Series Online`}</title>
        <meta name="title" content={`${tvTitle} | Ver Muvi - Series Online`} />
        <meta name="description" content={tvDescription} />
        <meta name="keywords" content={allKeywords} />
        <link rel="canonical" href={tvUrl} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="video.tv_show" />
        <meta property="og:url" content={tvUrl} />
        <meta property="og:title" content={tvTitle} />
        <meta property="og:description" content={tvDescription} />
        <meta property="og:image" content={tvImage} />
        <meta property="og:image:width" content="780" />
        <meta property="og:image:height" content="1170" />
        <meta property="og:site_name" content="Ver Muvi" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={tvUrl} />
        <meta name="twitter:title" content={tvTitle} />
        <meta name="twitter:description" content={tvDescription} />
        <meta name="twitter:image" content={tvImage} />

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
              {network?.logo_path ? (
                <img
                  src={baseUrl + network?.logo_path}
                  alt={network?.name + " logo"}
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

        <div className={"tv-series-stats"}>
          <div className={"stat-item"}>
            <span className={"stat-label"}>Episodes</span>
            <span className={"stat-value"}>{numberOfEpisodes || "N/A"}</span>
          </div>
          <div className={"stat-item"}>
            <span className={"stat-label"}>Status</span>
            <span className={"stat-value"}>{status || "Unknown"}</span>
          </div>
          {tvDetails?.episode_run_time &&
            tvDetails.episode_run_time.length > 0 && (
              <div className={"stat-item"}>
                <span className={"stat-label"}>Runtime</span>
                <span className={"stat-value"}>
                  {tvDetails.episode_run_time[0]} min
                </span>
              </div>
            )}
          {originalLanguage && (
            <div className={"stat-item"}>
              <span className={"stat-label"}>Language</span>
              <span className={"stat-value"}>{originalLanguage}</span>
            </div>
          )}
        </div>

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
        {keywords?.results && keywords.results.length > 0 && (
          <div className="keywords-section">
            <h3>Keywords</h3>
            <div className="keywords-list">
              {keywords.results.slice(0, 10).map((keyword) => (
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

        {/* Networks */}
        {tvDetails?.networks && tvDetails.networks.length > 0 && (
          <div className="production-companies">
            <h3>Networks</h3>
            <div className="companies-grid">
              {tvDetails.networks.map((net) => (
                <div key={net.id} className="company-item">
                  {net.logo_path ? (
                    <img src={baseUrl + net.logo_path} alt={net.name} />
                  ) : (
                    <span>{net.name}</span>
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

export default TVSeriesDetails;
