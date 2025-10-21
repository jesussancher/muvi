const token = process.env.REACT_APP_TMDB_ACCESS_TOKEN;
const apiKey = process.env.REACT_APP_TMDB_API_KEY;

const authOptions = {
  method: "GET",
  headers: {
    Authorization: "Bearer " + token,
    "Content-Type": "application/json;charset=utf-8",
  },
  json: true,
};

// ============= BASE REQUEST FUNCTIONS =============

const tmdbRequest = (req) => {
  let moviesList = fetch(
    `https://api.themoviedb.org/3/movie/${req}`,
    authOptions
  )
    .then(function (res) {
      return res.json();
    })
    .then(function (resJson) {
      return resJson;
    })
    .catch(function (error) {
      console.log("Error", error);
    });

  return moviesList;
};

const tmdbRequestTV = (req) => {
  let tvList = fetch(`https://api.themoviedb.org/3/tv/${req}`, authOptions)
    .then(function (res) {
      return res.json();
    })
    .then(function (resJson) {
      return resJson;
    })
    .catch(function (error) {
      console.log("Error", error);
    });

  return tvList;
};

const tmdbRequestList = async (array, limit) => {
  let resultList = [];
  for (let i = 0; i < limit; i++) {
    await tmdbRequest(array[i]).then(
      function (result) {
        resultList.push(result);
      },
      function (err) {
        console.log(err);
      }
    );
  }
  return resultList;
};

const tmdbRequestParams = (req) => {
  let moviesList = fetch(`https://api.themoviedb.org/3/${req}`, authOptions)
    .then(function (res) {
      return res.json();
    })
    .then(function (resJson) {
      return resJson;
    })
    .catch(function (error) {
      console.log("Error", error);
    });
  return moviesList;
};

// ============= MOVIE ENDPOINTS =============

const discoverMoviesByGenre = async (genre, page = 1) => {
  const baseRequest = `discover/movie?api_key=${apiKey}&sort_by=popularity.desc&page=${page}${
    genre ? `&with_genres=${genre}` : ""
  }`;
  let moviesList = await tmdbRequestParams(baseRequest);
  if (page === moviesList.total_pages) {
    discoverMoviesByGenre(genre, moviesList.total_pages);
  } else if (page === 0) {
    discoverMoviesByGenre(genre, 1);
  }
  return moviesList;
};

const tmdbSearchMovie = async (query) => {
  if (!query) return;
  const baseRequest = `/search/movie?api_key=${apiKey}&query=${query}`;
  let moviesList = await tmdbRequestParams(baseRequest);
  return moviesList;
};

const getAllGenresList = () => {
  let genresList = fetch(
    `https://api.themoviedb.org/3/genre/movie/list`,
    authOptions
  )
    .then(function (res) {
      return res.json();
    })
    .then(function (resJson) {
      return resJson;
    })
    .catch(function (error) {
      console.log("Error", error);
    });

  return genresList;
};

const getMovieWatchProviders = async (id) => {
  const baseRequest = `movie/${id}/watch/providers?api_key=${apiKey}`;
  let providers = await tmdbRequestParams(baseRequest);
  return providers;
};

const getMovieVideos = async (id) => {
  const baseRequest = `movie/${id}/videos?api_key=${apiKey}`;
  let videos = await tmdbRequestParams(baseRequest);
  return videos;
};

const getMovieReviews = async (id) => {
  const baseRequest = `movie/${id}/reviews?api_key=${apiKey}`;
  let reviews = await tmdbRequestParams(baseRequest);
  return reviews;
};

const getMovieRecommendations = async (id) => {
  const baseRequest = `movie/${id}/recommendations?api_key=${apiKey}`;
  let recommendations = await tmdbRequestParams(baseRequest);
  return recommendations;
};

const getMovieKeywords = async (id) => {
  const baseRequest = `movie/${id}/keywords?api_key=${apiKey}`;
  let keywords = await tmdbRequestParams(baseRequest);
  return keywords;
};

const getMovieExternalIds = async (id) => {
  const baseRequest = `movie/${id}/external_ids?api_key=${apiKey}`;
  let externalIds = await tmdbRequestParams(baseRequest);
  return externalIds;
};

// ============= TV ENDPOINTS =============

const discoverTVByGenre = async (genre, page = 1) => {
  const baseRequest = `discover/tv?api_key=${apiKey}&sort_by=popularity.desc&page=${page}${
    genre ? `&with_genres=${genre}` : ""
  }`;
  let tvList = await tmdbRequestParams(baseRequest);
  if (page === tvList.total_pages) {
    discoverTVByGenre(genre, tvList.total_pages);
  } else if (page === 0) {
    discoverTVByGenre(genre, 1);
  }
  return tvList;
};

const tmdbSearchTV = async (query) => {
  if (!query) return;
  const baseRequest = `/search/tv?api_key=${apiKey}&query=${query}`;
  let tvList = await tmdbRequestParams(baseRequest);
  return tvList;
};

const getAllTVGenresList = () => {
  let genresList = fetch(
    `https://api.themoviedb.org/3/genre/tv/list`,
    authOptions
  )
    .then(function (res) {
      return res.json();
    })
    .then(function (resJson) {
      return resJson;
    })
    .catch(function (error) {
      console.log("Error", error);
    });

  return genresList;
};

const getTVDetails = async (id) => {
  const details = await tmdbRequestTV(id);
  return details;
};

const getTVCredits = async (id) => {
  const credits = await tmdbRequestTV(`${id}/credits`);
  return credits;
};

const getTVWatchProviders = async (id) => {
  const baseRequest = `tv/${id}/watch/providers?api_key=${apiKey}`;
  let providers = await tmdbRequestParams(baseRequest);
  return providers;
};

const getTVVideos = async (id) => {
  const baseRequest = `tv/${id}/videos?api_key=${apiKey}`;
  let videos = await tmdbRequestParams(baseRequest);
  return videos;
};

const getTVReviews = async (id) => {
  const baseRequest = `tv/${id}/reviews?api_key=${apiKey}`;
  let reviews = await tmdbRequestParams(baseRequest);
  return reviews;
};

const getTVRecommendations = async (id) => {
  const baseRequest = `tv/${id}/recommendations?api_key=${apiKey}`;
  let recommendations = await tmdbRequestParams(baseRequest);
  return recommendations;
};

const getTVKeywords = async (id) => {
  const baseRequest = `tv/${id}/keywords?api_key=${apiKey}`;
  let keywords = await tmdbRequestParams(baseRequest);
  return keywords;
};

const getTVExternalIds = async (id) => {
  const baseRequest = `tv/${id}/external_ids?api_key=${apiKey}`;
  let externalIds = await tmdbRequestParams(baseRequest);
  return externalIds;
};

// ============= MULTI SEARCH (for global autocomplete) =============

const searchMulti = async (query) => {
  if (!query) return;
  const baseRequest = `search/multi?api_key=${apiKey}&query=${query}`;
  let results = await tmdbRequestParams(baseRequest);
  return results;
};

export {
  // Base
  tmdbRequest,
  tmdbRequestTV,
  tmdbRequestList,
  tmdbRequestParams,

  // Movies
  getAllGenresList,
  discoverMoviesByGenre,
  tmdbSearchMovie,
  getMovieWatchProviders,
  getMovieVideos,
  getMovieReviews,
  getMovieRecommendations,
  getMovieKeywords,
  getMovieExternalIds,

  // TV
  getAllTVGenresList,
  discoverTVByGenre,
  tmdbSearchTV,
  getTVDetails,
  getTVCredits,
  getTVWatchProviders,
  getTVVideos,
  getTVReviews,
  getTVRecommendations,
  getTVKeywords,
  getTVExternalIds,

  // Multi Search
  searchMulti,
};
