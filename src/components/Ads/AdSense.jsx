import React, { useEffect } from "react";
import "./AdSenseStyles.css";

function AdSense({ slot, format = "auto", responsive = true, className = "" }) {
  const clientId = process.env.REACT_APP_ADSENSE_CLIENT_ID;

  useEffect(() => {
    // Load AdSense script if not already loaded
    if (window && clientId) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (error) {
        console.error("AdSense error:", error);
      }
    }
  }, [clientId]);

  // Don't render if no client ID is configured
  if (!clientId || !slot) {
    return (
      <div className={`adsense-placeholder ${className}`}>
        <div className="adsense-placeholder-content">
          <i className="icon-info" />
          <p>Ad Space</p>
          <small>Configure REACT_APP_ADSENSE_CLIENT_ID</small>
        </div>
      </div>
    );
  }

  return (
    <div className={`adsense-container ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={clientId}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive.toString()}
      />
    </div>
  );
}

export default AdSense;
