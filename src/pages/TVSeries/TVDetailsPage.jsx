import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  TopNavbar,
  Footer,
  ButtomNavbar,
  GlobalSearch,
} from "../../components";
import {
  getTVDetails,
  getTVCredits,
  getTVWatchProviders,
  getTVVideos,
  // getTVReviews,
  // getTVRecommendations,
  getTVKeywords,
  getTVExternalIds,
} from "../../utils/API/API";
import CastCarousel from "../Details/CastCarousel";
import TVSeriesDetails from "./TVSeriesDetails";

function TVDetailsPage() {
  const param = useParams();

  const [tvDetails, setTVDetails] = useState(null);
  const [tvCredits, setTVCredits] = useState(null);
  const [watchProviders, setWatchProviders] = useState(null);
  const [videos, setVideos] = useState(null);
  // const [reviews, setReviews] = useState(null);
  // const [recommendations, setRecommendations] = useState(null);
  const [keywords, setKeywords] = useState(null);
  const [externalIds, setExternalIds] = useState(null);

  const getTVDetailsData = async (id) => {
    const details = await getTVDetails(id);
    setTVDetails(details);
  };

  const getTVCreditsData = async (id) => {
    const credits = await getTVCredits(id);
    setTVCredits(credits);
  };

  const fetchWatchProviders = async (id) => {
    const providers = await getTVWatchProviders(id);
    setWatchProviders(providers);
  };

  const fetchVideos = async (id) => {
    const vids = await getTVVideos(id);
    setVideos(vids);
  };

  // const fetchReviews = async (id) => {
  //   const revs = await getTVReviews(id);
  //   setReviews(revs);
  // };

  // const fetchRecommendations = async (id) => {
  //   const recs = await getTVRecommendations(id);
  //   setRecommendations(recs);
  // };

  const fetchKeywords = async (id) => {
    const keys = await getTVKeywords(id);
    setKeywords(keys);
  };

  const fetchExternalIds = async (id) => {
    const ids = await getTVExternalIds(id);
    setExternalIds(ids);
  };

  useEffect(() => {
    getTVDetailsData(param.id);
    getTVCreditsData(param.id);
    fetchWatchProviders(param.id);
    fetchVideos(param.id);
    // fetchReviews(param.id);
    // fetchRecommendations(param.id);
    fetchKeywords(param.id);
    fetchExternalIds(param.id);
  }, [param.id]);

  return (
    <div
      className={classNames("home-page")}
      onContextMenu={(e) => e.preventDefault()}
    >
      <TopNavbar />
      <GlobalSearch />
      <ButtomNavbar />
      <div className="details-layout">
        <div className="details-main-content">
          <TVSeriesDetails
            tvDetails={tvDetails}
            watchProviders={watchProviders}
            videos={videos}
            keywords={keywords}
            externalIds={externalIds}
          />
          <CastCarousel title={"Cast"} cast={tvCredits ? tvCredits.cast : []} />
        </div>
        <div className="details-sidebar"></div>
      </div>

      <div style={{ marginTop: 200 }}></div>
      <Footer />
    </div>
  );
}

export default TVDetailsPage;
