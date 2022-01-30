import React, { Fragment } from 'react';
import classNames from 'classnames';
import { NewReleaseCard } from '../../components';

function MoviesList(props) {

    const {
        moviesList,
        genresList
    } = props;

    return (
        <div className={classNames('movies-list flex-row')}>
            {moviesList?.map((movie, index) => {
                const image = movie.poster_path;
                const title = movie.original_title;
                const rate = movie.vote_average;
                const date = movie.release_date;
                const genre = genresList.find((genre) => genre.id === movie.genre_ids[0])?.name;
                return <Fragment key={index}><NewReleaseCard image={image} title={title} rate={rate} date={date} genre={genre}/></Fragment>
            })
        }
        </div>
    )
}

export default MoviesList