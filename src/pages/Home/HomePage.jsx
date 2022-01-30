import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { TopNavbar } from '../../components';
import { discoverMoviesByGenre, getAllGenresList } from '../../utils/API/API';
import'./HomePageStyles.css';
import FilterBar from './FilterBar';
import NewReleases from './NewReleases';
import MoviesList from './MoviesList';

function HomePage(props) {

    const [genresList, setGenresList] = useState([]);
    const [genreSelected, setGenreSelected] = useState({});
    const [moviesList, setMoviesList] = useState([]);
    
    const getGenresList = async() => {
        const genres = await getAllGenresList('now_playing');
        setGenresList(genres.genres);
        setGenreSelected(genres.genres[0]);
    }

    const getMoviesList = async (genre) => {
        const byGenre = await discoverMoviesByGenre(genre);
        setMoviesList(byGenre.results);
    }

    const getSelectedGenre = (genre) => {
        setGenreSelected(genre);
    }

    // Request now playing movies
    useEffect(() => {
        getGenresList();
    },[]) // eslint-disable-line react-hooks/exhaustive-deps
    
    useEffect(() => {
        getMoviesList(genreSelected.id);
    },[genreSelected]) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className={classNames('home-page')} onContextMenu={e => e.preventDefault()}>
            <TopNavbar />
            <NewReleases genresList={genresList} />
            <FilterBar genresList={genresList} getSelected={getSelectedGenre}/>
            <MoviesList genresList={genresList} moviesList={moviesList} />
        </div>
    )
}

export default HomePage;