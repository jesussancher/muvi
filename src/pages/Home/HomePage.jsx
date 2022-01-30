import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { TopNavbar } from '../../components';
import { discoverMoviesByGenre, getAllGenresList } from '../../utils/API/API';
import'./HomePageStyles.css';
import FilterBar from './FilterBar';
import Carousel from './Carousel';
import MoviesList from './MoviesList';
import HeadVideo from './HeadVideo';

function HomePage(props) {

    const [genresList, setGenresList] = useState([]);
    const [genreSelected, setGenreSelected] = useState({});
    const [moviesList, setMoviesList] = useState([]);
    const [favoritesList, setFavoritesList] = useState([]);
    
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

    const updateFavoritesList = (list) => {
        setFavoritesList(list);
    }

    // Request now playing movies
    useEffect(() => {
        getGenresList();
    },[]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect( () => {
        async function getFavoritesList() {
            const favorites = await localStorage.getItem('favorites');
            if(!favorites) {
                localStorage.setItem('favorites', JSON.stringify([]));
            } else {
                setFavoritesList(favorites)
            }
        }
        getFavoritesList();
    },[]) // eslint-disable-line react-hooks/exhaustive-deps
    
    useEffect(() => {
        getMoviesList(genreSelected.id);
    },[genreSelected]) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className={classNames('home-page')} onContextMenu={e => e.preventDefault()}>
            <TopNavbar />
            <HeadVideo genresList={genresList} />
            <Carousel type={'new'} genresList={genresList} favoritesList={favoritesList} updateFavoritesList={updateFavoritesList}/>
            <Carousel type={'now'} genresList={genresList} favoritesList={favoritesList} updateFavoritesList={updateFavoritesList}/>
            <FilterBar genresList={genresList} getSelected={getSelectedGenre}/>
            <MoviesList genresList={genresList} moviesList={moviesList} favoritesList={favoritesList} updateFavoritesList={updateFavoritesList}/>
        </div>
    )
}

export default HomePage;