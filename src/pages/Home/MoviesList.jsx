import React, { Fragment, Suspense } from 'react';
import classNames from 'classnames';
import { MovieCard } from '../../components';

function MoviesList(props) {

    const {
        moviesList,
        genresList,
        favoritesList,
        updateFavoritesList
    } = props;

    const drawCards = () => {
        const cardsNodeList  = moviesList?.map((movie, index) => {
            const id = movie.id;
            const image = movie.poster_path;
            const title = movie.original_title;
            const rate = movie.vote_average;
            const date = movie.release_date;
            const genre = genresList.find((genre) => genre.id === movie.genre_ids[0])?.name;
            const isFavorite = favoritesList.includes(id);
            return <Fragment key={index}>
                    <Suspense fallback={<MovieCard />}>
                        <MovieCard id={id} image={image} title={title} rate={rate} date={date} genre={genre} isFavorite={isFavorite} getFavoritesList={updateFavoritesList}/>
                    </Suspense>
                </Fragment>
        });

        return cardsNodeList;
    }
    
    const drawCardsDummy = () => {
        const dummyCardsList = (new Array(20)).fill(null);
        const cardsNodeList  =  dummyCardsList?.map((movie, index) => {
            return <Fragment key={index}><MovieCard /></Fragment>
        })

        return cardsNodeList;
    }

    return (
        <section id={'moviesListSection'} className={classNames('movies-list flex-row')}>
            {moviesList || moviesList.length > 0
                ?
                drawCards()
                :
                drawCardsDummy()
            }
        </section>
    )
}

export default MoviesList