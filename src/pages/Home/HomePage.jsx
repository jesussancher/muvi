import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { TopNavbar, ButtomNavbar } from '../../components';
import { discoverMoviesByGenre, getAllGenresList, tmdbSearchMovie } from '../../utils/API/API';
import'./HomePageStyles.css';
import FilterBar from './FilterBar';
import Carousel from './Carousel';
import MoviesList from './MoviesList';
import HeadVideo from './HeadVideo';

function HomePage() {

    const [genresList, setGenresList] = useState([]);
    const [genreSelected, setGenreSelected] = useState({});
    const [moviesList, setMoviesList] = useState([]);
    const [favoritesList, setFavoritesList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchValue, setSearchValue] = useState('');
    
    const getGenresList = async() => {
        const genres = await getAllGenresList('now_playing');
        setGenresList(genres.genres);
    }

    const getMoviesList = async (genre) => {
        const byGenre = await discoverMoviesByGenre(genre);
        setMoviesList(byGenre.results);
    }

    
    const getMoviesSearch = async (query) => {
        const byQuery = await tmdbSearchMovie(query);
        setMoviesList(byQuery.results);
    }

    const getMoviesPagination = async (n) => {
        const newPage = currentPage + n;
        if(newPage === 0) return;
        const byPage = await discoverMoviesByGenre(genreSelected, newPage);
        setCurrentPage(newPage);
        setMoviesList(byPage.results);
    }

    const getSelectedGenre = (genre) => {
        setGenreSelected(genre);
    }

    const getSearchValue = (query) => {
        setSearchValue(query.split(" ").join("%20"));
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

    useEffect(() => {
        if(searchValue === '') {
            getMoviesList(genreSelected.id)
        } else {
            getMoviesSearch(searchValue);
        }
    },[searchValue]) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className={classNames('home-page')} onContextMenu={e => e.preventDefault()}>
            <TopNavbar />
            <HeadVideo genresList={genresList} />
            <Carousel type={'new'} genresList={genresList} favoritesList={favoritesList} updateFavoritesList={updateFavoritesList}/>
            <Carousel type={'now'} genresList={genresList} favoritesList={favoritesList} updateFavoritesList={updateFavoritesList}/>
            <FilterBar genresList={genresList} getSelected={getSelectedGenre}/>
            <MoviesList genresList={genresList} moviesList={moviesList} favoritesList={favoritesList} updateFavoritesList={updateFavoritesList}/>
            <ButtomNavbar pageNavigation={getMoviesPagination} getSearchValue={getSearchValue}/>
        </div>
    )
}

export default HomePage;