import React, { Fragment, useEffect, useState } from 'react';
import { Icon, NewReleaseCard } from '../../components';
import { tmdbRequest } from '../../utils/API/API';

const deltas = {
    left: -200,
    right: 200,
    null: 0
}

function NewReleases(props) {

    const [moviesList, setMoviesList] = useState([]);
    const [moviesListPopular, setMoviesListPopular] = useState([]);
    const [controlInterval, setControlInterval] = useState(null);
    const { 
        genresList
    } = props

    const getMoviesList = async() => {
        const movies = await tmdbRequest('now_playing');
        const popular = await tmdbRequest('popular');
        const latest = await tmdbRequest('latest');
        console.log(latest)
        setMoviesList(movies.results);
        setMoviesListPopular(popular.results);
    }
    // Request now playing movies
    useEffect(() => {
        getMoviesList();
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

    const drawCards = () => {
        const cardsNodeList  = moviesList?.map((movie, index) => {
            const image = movie.poster_path;
            const title = movie.original_title;
            const rate = movie.vote_average;
            const date = movie.release_date;
            const genre = genresList.find((genre) => genre.id === movie.genre_ids[0])?.name;
            return <Fragment key={index}><NewReleaseCard image={image} title={title} rate={rate} date={date} genre={genre}/></Fragment>
        });

        return cardsNodeList;
    }

    
    const drawCardsDummy = () => {
        const dummyCardsList = (new Array(20)).fill(null);
        const cardsNodeList  =  dummyCardsList?.map((movie, index) => {
            return <Fragment key={index}><NewReleaseCard /></Fragment>
        })

        return cardsNodeList;
    }

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
                        {moviesList?
                        drawCards()
                        :
                        drawCardsDummy()
                    }
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