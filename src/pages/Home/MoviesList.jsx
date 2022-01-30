import React, { Fragment } from 'react';
import classNames from 'classnames';
import { MovieCard } from '../../components';

function MoviesList(props) {

    const {
        moviesList,
        genresList,
        favoritesList,
        updateFavoritesList
    } = props;

    return (
        <div className={classNames('movies-list flex-row')}>
            {moviesList?.map((movie, index) => {
                const id = movie.id;
                const image = movie.poster_path;
                const title = movie.original_title;
                const rate = movie.vote_average;
                const date = movie.release_date;
                const genre = genresList.find((genre) => genre.id === movie.genre_ids[0])?.name;
                const isFavorite = favoritesList.includes(id);
                return <Fragment key={index}><MovieCard id={id} image={image} title={title} rate={rate} date={date} genre={genre} isFavorite={isFavorite} getFavoritesList={updateFavoritesList}/></Fragment>
            })
        }
        </div>
    )
}

export default MoviesList