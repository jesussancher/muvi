import React, { useEffect, useState } from 'react';
import { tmdbRequest } from '../../utils/API/API';

function HeadVideo (props) {

    const [moviesList, setMoviesList] = useState([]);
    const [currentMovie, setCurrentMovie] = useState({movieId: '', videoId: '', index: 0, details: null});

    const { 
        genresList
    } = props;

    const getMoviesList = async() => {
        const movies = await tmdbRequest('upcoming');
        if(movies.results.length === 0) return;
        await getCurrentMovie(movies.results[1].id, 1);
        setTimeout( async () => {
            await getCurrentMovie(movies.results[2].id, 2);
        },[30000])
        setMoviesList(movies.results);
    }

    const getCurrentMovie = async(movieId, index) => {
        const videos = await tmdbRequest(`${movieId}/videos`);
        if(videos.results.length === 0 && moviesList.length === 0) {
            const nextMovieId= moviesList[index + 1].id;
            const nextMovievideos = await tmdbRequest(`${movieId}/videos`);
            const nextVideoId = nextMovievideos.results[0].key;
            const nextMovieDetails = await tmdbRequest(nextMovieId);
            setCurrentMovie({movieId: nextMovieId, videoId: nextVideoId, index: index +1, details: nextMovieDetails});
        } else {
            const videoId = videos.results[0].key;
            const details = await tmdbRequest(movieId);
            setCurrentMovie({movieId, videoId, index, details});
        }
    }
    // Request now playing movies
    useEffect(() => {
        getMoviesList();
    },[])  // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if(currentMovie.movieId === '' || moviesList.length === 0) return;
        setTimeout( () => {
            const newIndex = currentMovie.index === moviesList.length -1 ? 0 : currentMovie.index + 1;
            getCurrentMovie(moviesList[newIndex].id, newIndex);
        },[30000])
    }, [currentMovie, moviesList]) // eslint-disable-line react-hooks/exhaustive-deps
    return (
        <section id="headVideoSection">
            <div className={'movie-overlay flex-column'}>
                {currentMovie.details && 
                    <div>
                        <p>{currentMovie.details.vote_average}</p>
                        <h1>{currentMovie.details.title}</h1>
                        <h3>{currentMovie.details.genres[0].name}</h3>
                    </div>
                }
            </div>
            {currentMovie.videoId !== '' && 
                <iframe 
                    className="head-video-player"
                    src={`https://www.youtube.com/embed/${currentMovie.videoId}?autoplay=1&amp;controls=0&amp;disablekb=1&amp;rel=1&amp;color=white&amp;showinfo=0`}
                    title="YouTube video player" 
                    frameBorder="0"
                    allow="accelerometer; gyroscope; autoplay"
                >
                </iframe>
            }
        </section>
    )
}

export default HeadVideo;