import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./ContentTypeNavbarStyles.css";
import { motion } from "framer-motion";

function ContentTypeNavbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isMoviesActive =
    location.pathname === "/" || location.pathname.startsWith("/movie");
  const isSeriesActive = location.pathname.startsWith("/tv");

  return (
    <div className="content-type-navbar">
      <div className="content-type-tabs">
        <button
          className={`content-tab ${isMoviesActive ? "active" : ""}`}
          onClick={() => navigate("/")}
        >
          <span>Movies</span>
          {isMoviesActive && (
            <motion.div
              className="tab-indicator"
              layoutId="activeTab"
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
            />
          )}
        </button>
        <button
          className={`content-tab ${isSeriesActive ? "active" : ""}`}
          onClick={() => navigate("/tv")}
        >
          <span>Series</span>
          {isSeriesActive && (
            <motion.div
              className="tab-indicator"
              layoutId="activeTab"
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
            />
          )}
        </button>
      </div>
    </div>
  );
}

export default ContentTypeNavbar;
