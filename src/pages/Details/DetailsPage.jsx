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
  tmdbRequest,
  getMovieWatchProviders,
  getMovieVideos,
  // getMovieReviews,
  // getMovieRecommendations,
  getMovieKeywords,
  getMovieExternalIds,
} from "../../utils/API/API";
import CastCarousel from "./CastCarousel";
import MovieDetails from "./MovieDetails";

function DetailsPage() {
  const param = useParams();

  const [movieDetails, setMovieDetails] = useState(null);
  const [movieCredits, setMovieCredits] = useState(null);
  const [watchProviders, setWatchProviders] = useState(null);
  const [videos, setVideos] = useState(null);
  // const [reviews, setReviews] = useState(null);
  // const [recommendations, setRecommendations] = useState(null);
  const [keywords, setKeywords] = useState(null);
  const [externalIds, setExternalIds] = useState(null);

  const getMovieDetails = async (id) => {
    const details = await tmdbRequest(id);
    setMovieDetails(details);
  };

  const getMovieCredits = async (id) => {
    const credits = await tmdbRequest(`${id}/credits`);
    setMovieCredits(credits);
  };

  const fetchWatchProviders = async (id) => {
    const providers = await getMovieWatchProviders(id);
    setWatchProviders(providers);
  };

  const fetchVideos = async (id) => {
    const vids = await getMovieVideos(id);
    setVideos(vids);
  };

  // const fetchReviews = async (id) => {
  //   const revs = await getMovieReviews(id);
  //   setReviews(revs);
  // };

  // const fetchRecommendations = async (id) => {
  //   const recs = await getMovieRecommendations(id);
  //   setRecommendations(recs);
  // };

  const fetchKeywords = async (id) => {
    const keys = await getMovieKeywords(id);
    setKeywords(keys);
  };

  const fetchExternalIds = async (id) => {
    const ids = await getMovieExternalIds(id);
    setExternalIds(ids);
  };

  useEffect(() => {
    getMovieDetails(param.id);
    getMovieCredits(param.id);
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
          <MovieDetails
            movieDetails={movieDetails}
            watchProviders={watchProviders}
            videos={videos}
            keywords={keywords}
            externalIds={externalIds}
          />
          <CastCarousel
            title={"Cast"}
            cast={movieCredits ? movieCredits.cast : []}
          />
        </div>
      </div>

      <div style={{ marginTop: 200 }}></div>
      <Footer />
    </div>
  );
}

export default DetailsPage;
