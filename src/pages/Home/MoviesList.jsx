import React, { Fragment, Suspense } from 'react';
import classNames from 'classnames';
import { MovieCard } from '../../components';

function MoviesList(props) {

    const {
        title,
        style,
        release,
        className,
        moviesList,
        genresList,
        fromFavorites,
        favoritesList,
        childrenStyle,
        updateFavoritesList
    } = props;

    const drawCards = () => {
        const cardsNodeList  = moviesList?.map((movie, index) => {
            const id = movie.id;
            const image = movie.poster_path;
            const title = movie.title;
            const rate = movie.vote_average;
            const date = movie.release_date;
            const genre = movie.genre ? movie.genre : genresList.find((genre) => genre.id === movie.genre_ids[0])?.name;
            const genreId = movie.genreId ? movie.genreId : movie.genre_ids[0];
            const isFavorite = favoritesList?.some(fav => fav.id === id);
            return <Fragment key={index}>
                    <Suspense fallback={<MovieCard />}>
                        <MovieCard id={id} image={image} release={release} fromFavorites={fromFavorites} title={title} rate={rate} date={date} genre={genre} genreId={genreId} isFavorite={isFavorite} getFavoritesList={updateFavoritesList}/>
                    </Suspense>
                </Fragment>
        });

        return cardsNodeList;
    }
    
    const drawCardsDummy = () => {
        const dummyCardsList = (new Array(10)).fill(null);
        const cardsNodeList  =  dummyCardsList?.map((movie, index) => {
            return <Fragment key={index}><MovieCard /></Fragment>
        })

        return cardsNodeList;
    }

    return (
        <section id={'moviesListSection'} style={{...style}} className={className}>
            {title && <h1>{title}</h1>}
            <div className={classNames('movies-list flex-row')} style={{...childrenStyle}}>
                {moviesList?.length > 0
                    ?
                    drawCards()
                    :
                    drawCardsDummy()
                }
            </div>
        </section>
    )
}

export default React.memo(MoviesList);