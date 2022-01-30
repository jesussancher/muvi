const authOptions = {
    method: 'GET',
    headers: {
        'Authorization': 'Bearer ' + process.env.REACT_APP_TMDB_ACCESS_TOKEN,
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
    getAllGenresList
}


