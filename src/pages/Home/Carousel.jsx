import React, { Fragment, Suspense, useEffect, useState } from 'react';
import { Icon, MovieCard } from '../../components';
import { tmdbRequest } from '../../utils/API/API';

const deltas = {
    left: -200,
    right: 200,
    null: 0
}

const types = {
    now: {id: 'now_playing', title: 'New Releases'},
    new: {id: 'upcoming', title: 'Upcoming'}
}

function Carousel(props) {

    const [moviesList, setMoviesList] = useState([]);
    const [controlInterval, setControlInterval] = useState(null);
    const {
        type,
        title,
        movies,
        genresList,
        favoritesList,
        fromFavorites,
        updateFavoritesList
    } = props

    const getMoviesList = async() => {
        const movies = await tmdbRequest(types[type].id);
        setMoviesList(movies.results);
    }
    // Request now playing movies
    useEffect(() => {
        type && getMoviesList();
    },[type])  // eslint-disable-line react-hooks/exhaustive-deps

    const scrollOnMouseWheel = (event) => {
        const carousel = document.querySelector(`#${title ? title.split(' ')[0] : type}Carousel`);
        event.preventDefault();
        if(!carousel) return;
        carousel.scrollLeft += event.deltaY;
    }

    const controlScroll = (delta) => {
        const carousel = document.querySelector(`#${title ? title.split(' ')[0] : type}Carousel`);
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
        const carousel = document.querySelector(`#${title ? title.split(' ')[0] : type}Carousel`);
        carousel.addEventListener('wheel', scrollOnMouseWheel);
        return function cleanup() {
            carousel.removeEventListener('wheel', scrollOnMouseWheel);
        }
    },[]) // eslint-disable-line react-hooks/exhaustive-deps

    const drawCards = () => {
        const cardsNodeList  = (movies ? movies :moviesList)?.map((movie, index) => {
            const id = movie.id;
            const image = movie.poster_path;
            const title = movie.title;
            const rate = movie.vote_average;
            const genre = movie.genre ? movie.genre : genresList.find((genre) => genre.id === movie.genre_ids[0])?.name;
            const genreId = movie.genreId ? movie.genreId : movie.genre_ids[0];
            const isFavorite = favoritesList?.some(fav => fav.id === id);
            return <Fragment key={index}>
                    <Suspense fallback={<MovieCard release />}>
                        <MovieCard id={id} image={image} release title={title} fromFavorites={fromFavorites} rate={rate} genre={genre} genreId={genreId} isFavorite={isFavorite} getFavoritesList={updateFavoritesList}/>
                    </Suspense>
                </Fragment>
        });

        return cardsNodeList;
    }
    
    const drawCardsDummy = () => {
        const dummyCardsList = (new Array(20)).fill(null);
        const cardsNodeList  =  dummyCardsList?.map((movie, index) => {
            return <Fragment key={index}><MovieCard release /></Fragment>
        })

        return cardsNodeList;
    }

    return (
        <section id={`${title ? title.split(' ')[0] : type}Section`}>
            <h1>{title ? title : types[type].title}</h1>
            <div className={'section-content new-releases flex-row flex-center shadow'}>
                <div className={'land-slider flex-row flex-row-center-vert'}>
                    <div 
                        className={'control left flex-column flex-center '}
                        onClick={() => controlScroll(-200)}
                        onMouseDown={() => continuesScrollOnControlClick('left')}
                        onMouseUp={stopScrollOnControlBlur}
                    >
                        <Icon icon={'chevron-left'}/>
                    </div>
                    <div  id={`${title ? title.split(' ')[0] : type}Carousel`} className={'carousel land-scroll flex-row flex-row-center-vert'}>
                        {moviesList || moviesList.length > 0
                            ?
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

export default Carousel;