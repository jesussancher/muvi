import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { searchMulti } from "../../utils/API/API";
import { motion, AnimatePresence } from "framer-motion";
import "./GlobalSearchStyles.css";

const baseUrl = "https://image.tmdb.org/t/p/w200";

function GlobalSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery.length >= 3) {
        performSearch(searchQuery);
      } else {
        setSearchResults([]);
        setIsOpen(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchRef]);

  const performSearch = async (query) => {
    setIsLoading(true);
    try {
      const results = await searchMulti(query);
      if (results && results.results) {
        // Filter to only movies and TV shows
        const filtered = results.results
          .filter(
            (item) => item.media_type === "movie" || item.media_type === "tv"
          )
          .slice(0, 8);
        setSearchResults(filtered);
        setIsOpen(true);
      }
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResultClick = (result) => {
    const path =
      result.media_type === "movie"
        ? `/movie/${result.id}`
        : `/tv/${result.id}`;
    navigate(path);
    setSearchQuery("");
    setIsOpen(false);
    setSearchResults([]);
  };

  const getYear = (item) => {
    const date = item.release_date || item.first_air_date;
    return date ? new Date(date).getFullYear() : "";
  };

  const getTitle = (item) => {
    return item.title || item.name || "Unknown";
  };

  return (
    <div className="global-search-container" ref={searchRef}>
      <div className="global-search-input-wrapper">
        <i className="icon-search" />
        <input
          type="text"
          className="global-search-input"
          placeholder="Search movies & series..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => {
            if (searchResults.length > 0) setIsOpen(true);
          }}
        />
        {isLoading && <div className="search-spinner"></div>}
      </div>

      <AnimatePresence>
        {isOpen && searchResults.length > 0 && (
          <motion.div
            className="global-search-results"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {searchResults.map((result, index) => (
              <motion.div
                key={result.id}
                className="search-result-item"
                onClick={() => handleResultClick(result)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ backgroundColor: "rgba(91, 241, 146, 0.1)" }}
              >
                <div className="result-poster">
                  {result.poster_path ? (
                    <img
                      src={baseUrl + result.poster_path}
                      alt={getTitle(result)}
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                  ) : (
                    <div className="result-poster-placeholder">
                      <i className="icon-movies" />
                    </div>
                  )}
                </div>
                <div className="result-info">
                  <div className="result-title">{getTitle(result)}</div>
                  <div className="result-meta">
                    <span className="result-type">
                      {result.media_type === "movie" ? "Movie" : "TV Series"}
                    </span>
                    {getYear(result) && (
                      <>
                        <span className="result-separator">•</span>
                        <span className="result-year">{getYear(result)}</span>
                      </>
                    )}
                    {result.vote_average > 0 && (
                      <>
                        <span className="result-separator">•</span>
                        <span className="result-rating">
                          <i className="icon-star-contain" />
                          {result.vote_average.toFixed(1)}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default GlobalSearch;
