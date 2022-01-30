const token = process.env.REACT_APP_TMDB_ACCESS_TOKEN;
const apiKey = process.env.REACT_APP_TMDB_API_KEY;

const authOptions = {
    method: 'GET',
    headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json;charset=utf-8'
    },
    json: true
};

const tmdbRequest = (req) => {
    let moviesList = 
    fetch(`https://api.themoviedb.org/3/movie/${req}`, authOptions)  
    .then(function(res) {
        return res.json();
    })
    .then(function(resJson) {
        return resJson;
   })

   return moviesList
}

const discoverMoviesByGenre = async (genre = 28, page = 1) => {
    const baseRequest = `discover/movie?api_key=${apiKey}&sort_by=popularity.desc&page=${page}&with_genres=${genre}`
    const moviesList = await tmdbRequestParams(baseRequest);
    console.log("genre", genre, moviesList)
    return moviesList
}


const tmdbRequestParams = (req) => {
    let moviesList = 
    fetch(`https://api.themoviedb.org/3/${req}`, authOptions)  
    .then(function(res) {
        return res.json();
    })
    .then(function(resJson) {
        return resJson;
   })

   return moviesList
}

const getAllGenresList = () => {
    let genresList = 
    fetch(`https://api.themoviedb.org/3/genre/movie/list`, authOptions)  
    .then(function(res) {
        return res.json();
    })
    .then(function(resJson) {
        return resJson;
   })

   return genresList
}

export {
    tmdbRequest,
    getAllGenresList,
    tmdbRequestParams,
    discoverMoviesByGenre
}


