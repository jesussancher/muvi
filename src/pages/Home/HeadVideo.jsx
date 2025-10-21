import React, { useEffect, useState } from "react";
import { VideoPlayer } from "../../components";
import {
  tmdbRequest,
  tmdbRequestList,
  tmdbRequestTV,
} from "../../utils/API/API";

const baseUrl = "https://www.youtube.com/watch?v=";
const videosLimit = 3;
function HeadVideo({ isTV = false }) {
  const [videosList, setVideosList] = useState([]);
  const [currentMovie, setCurrentMovie] = useState({
    videoKey: "",
    details: null,
    index: 0,
  });
  const [currentMovieDuration, setCurrentMovieDuration] = useState(0);
  const [canPlay, setCanPlay] = useState(false);

  const getMoviesList = async () => {
    const requestFunction = isTV ? tmdbRequestTV : tmdbRequest;
    const endpoint = isTV ? "popular" : "upcoming";
    const movies = await requestFunction(endpoint);
    if (movies.results.length === 0) return;
    const moviesList = movies.results.map((movie) => `${movie.id}/videos`);
    const videosObjects = await tmdbRequestList(moviesList, videosLimit);
    let videosKeys = [];
    videosObjects.forEach((video, index) => {
      videosKeys.push({
        movieId: video?.id,
        videoKey: baseUrl + video?.results[0]?.key,
        index,
      });
    });
    setVideosList(videosKeys);
    getMovieDetails(videosKeys[0].movieId, videosKeys[0].videoKey, 0);
  };

  const getMovieDetails = async (movieId, videoKey, index) => {
    const requestFunction = isTV ? tmdbRequestTV : tmdbRequest;
    const details = await requestFunction(movieId);
    setCurrentMovie({ videoKey, details, index });
  };

  const getDuration = (duration) => {
    setCurrentMovieDuration(duration);
  };

  const getShowCallback = (playing) => {
    setCanPlay(playing);
  };

  useEffect(() => {
    getMoviesList();
  }, [isTV]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (
      currentMovieDuration === 0 ||
      videosList.length === 0 ||
      !currentMovie.details ||
      !canPlay
    )
      return;
    setTimeout(() => {
      let newIndex = currentMovie.index + 1;
      if (newIndex === videosLimit) {
        newIndex = 0;
      }
      getMovieDetails(
        videosList[newIndex].movieId,
        videosList[newIndex].videoKey,
        newIndex
      );
    }, currentMovieDuration * 1000);
  }, [currentMovie, currentMovieDuration, videosList, canPlay]);

  return (
    <section id="headVideoSection">
      <div className={"movie-overlay flex-column"}>
        {currentMovie.details && (
          <div className={"movie-overlay-details"}>
            {(currentMovie.details.vote_average !== undefined ||
              currentMovie.details.vote_average !== null) && (
              <div className={"card-rate"}>
                <i className={`icon-star-contain`} />
                {currentMovie.details.vote_average}
              </div>
            )}
            {(currentMovie.details.title || currentMovie.details.name) && (
              <div className={"card-title"}>
                {currentMovie.details.title || currentMovie.details.name}
              </div>
            )}
            {currentMovie.details.genres &&
              currentMovie.details.genres[0] &&
              currentMovie.details.genres[0].name && (
                <div className={"card-genre"}>
                  {currentMovie.details.genres[0].name}
                </div>
              )}
          </div>
        )}
      </div>
      <VideoPlayer
        videoKey={currentMovie?.videoKey}
        backdrop={currentMovie?.details?.backdrop_path}
        className="head-video-player"
        getDuration={getDuration}
        getShowCallback={getShowCallback}
      />
    </section>
  );
}

export default HeadVideo;
