import React, { useEffect, useState } from "react";
import "./AdSenseStyles.css";

function AdSense({ slot = "8622455036", className = "", format = "auto" }) {
  const [showPlaceholder, setShowPlaceholder] = useState(false);
  const isDevelopment =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1";

  useEffect(() => {
    // Show placeholder in development or after 2 seconds if ad doesn't load
    const timer = setTimeout(() => {
      setShowPlaceholder(true);
    }, 2000);

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (error) {
      console.error("AdSense error:", error);
      setShowPlaceholder(true);
    }

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`adsense-container ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-6431549888769819"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
      {(isDevelopment || showPlaceholder) && (
        <div className="adsense-placeholder">
          <div className="adsense-placeholder-content">
            <i className="icon-info" />
            <p>Ad Space</p>
            <small>
              {isDevelopment
                ? "AdSense ads don't show in development"
                : "Ad will appear here when loaded"}
            </small>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdSense;
