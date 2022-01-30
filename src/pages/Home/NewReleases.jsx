import React, { Fragment, useEffect, useState } from 'react';
import { Icon, NewReleaseCard } from '../../components';
import { getAllGenresList, tmdbRequest } from '../../utils/API/API';

const deltas = {
    left: -200,
    right: 200,
    null: 0
}

function NewReleases() {

    const [moviesList, setMoviesList] = useState([]);
    const [genresList, setGenresList] = useState([]);
    const [controlInterval, setControlInterval] = useState(null);


    const getMoviesList = async() => {
        const movies = await tmdbRequest('now_playing');
        setMoviesList(movies.results);
    }
    // Request now playing movies
    useEffect(() => {
        getMoviesList();
    },[])


    const getGenresList = async() => {
        const genres = await getAllGenresList('now_playing');
        setGenresList(genres.genres);
    }

    // Request now playing movies
    useEffect(() => {
        getGenresList();
    },[])


    const scrollOnMouseWheel = (event) => {
        const carousel = document.querySelector("#releaseCarousel");
        event.preventDefault();
        if(!carousel) return;
        carousel.scrollLeft += event.deltaY;
    }

    const controlScroll = (delta) => {
        const carousel = document.querySelector("#releaseCarousel");
        carousel.scrollLeft += delta;
    }

    const continuesScrollOnControlClick = (delta) => {
        const deltaX = deltas[delta];
        setControlInterval(setInterval(() => controlScroll(deltaX), 200))
    }

    const stopScrollOnControlBlur = () => {
        clearInterval(controlInterval);  
    }

    useEffect(() => {
        const carousel = document.querySelector("#releaseCarousel");
        carousel.addEventListener('wheel', scrollOnMouseWheel);
        return function cleanup() {
            carousel.removeEventListener('wheel', scrollOnMouseWheel);
        }
    },[]) // eslint-disable-line react-hooks/exhaustive-deps


    return (
        <section id={'newRelases'}>
            <h1>New Releases</h1>
            <div className={'section-content new-releases flex-row flex-center shadow'}>
                <div className={'land-slider flex-row flex-center '}>
                    <div 
                        className={'control left flex-column flex-center'}
                        onClick={() => controlScroll(-200)}
                        onMouseDown={() => continuesScrollOnControlClick('left')}
                        onMouseUp={stopScrollOnControlBlur}
                    >
                        <Icon icon={'chevron-left'}/>
                    </div>
                    <div id={'releaseCarousel'} className={'carousel land-scroll flex-row flex-row-center-vert'}>
                        {moviesList.map((movie, index) => {
                            const image = movie.poster_path;
                            const title = movie.original_title;
                            const rate = movie.vote_average;
                            const date = movie.release_date;
                            const genre = genresList.find((genre) => genre.id === movie.genre_ids[0])?.name;
                            return <Fragment key={index}><NewReleaseCard image={image} title={title} rate={rate} date={date} genre={genre}/></Fragment>
                        })}
                    </div>
                    <div 
                        className={'control right flex-column flex-center'} 
                        onClick={() => controlScroll(200)}
                        onMouseDown={() => continuesScrollOnControlClick('right')}
                        onMouseUp={stopScrollOnControlBlur}
                    >
                        <Icon icon={'chevron-right'}/>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default NewReleases;