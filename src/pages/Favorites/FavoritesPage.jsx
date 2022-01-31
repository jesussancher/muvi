import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { TopNavbar, ButtomNavbar } from '../../components';
import { discoverMoviesByGenre, getAllGenresList } from '../../utils/API/API';
import'../Home/HomePageStyles.css';
import MoviesList from '../Home/MoviesList';

function FavoritesPage() {

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
                setFavoritesList(JSON.parse(favorites))
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
            <div style={{marginTop: 30}}></div>
            <MoviesList fromFavorites title={'My Favorites'} genresList={genresList} moviesList={favoritesList} favoritesList={favoritesList} updateFavoritesList={updateFavoritesList}/>
            <ButtomNavbar />
        </div>
    )
}

export default FavoritesPage;