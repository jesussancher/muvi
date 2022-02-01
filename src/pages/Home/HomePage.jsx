import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { TopNavbar, ButtomNavbar, Footer } from '../../components';
import { discoverMoviesByGenre, getAllGenresList, tmdbSearchMovie } from '../../utils/API/API';
import'./HomePageStyles.css';
import FilterBar from './FilterBar';
import Carousel from './Carousel';
import MoviesList from './MoviesList';
import HeadVideo from './HeadVideo';

function HomePage() {

    document.title = `Muvi | Home`;

    const [genresList, setGenresList] = useState([]);
    const [genreSelected, setGenreSelected] = useState({});
    const [moviesList, setMoviesList] = useState([]);
    const [favoritesList, setFavoritesList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchValue, setSearchValue] = useState('');
    const [searchMode, setSearchMode] = useState(false);

    const getGenresList = async() => {
        const genres = await getAllGenresList();
        setGenresList(genres.genres);
    }

    const getMoviesList = async (genre, page = 1) => {
        const byGenre = await discoverMoviesByGenre(genre, page);
        setMoviesList(byGenre.results);
    }

    
    const getMoviesSearch = async (query) => {
        const byQuery = await tmdbSearchMovie(query);
        setMoviesList(byQuery.results);
    }

    const getMoviesPagination = async (n) => {
        const newPage = currentPage + n;
        if(newPage === 0) return;
        const byPage = await discoverMoviesByGenre(genreSelected.id, newPage);
        setCurrentPage(newPage);
        setMoviesList(byPage.results);
    }

    const getSelectedGenre = (genre) => {
        setGenreSelected(genre);
        setCurrentPage(1);
    }

    const getSearchMode = (mode) => {
        setSearchMode(mode);
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
            getMoviesList(genreSelected.id, currentPage);
        } else {
            if(!searchMode) return;
            getMoviesSearch(searchValue);
        }
    },[searchValue, currentPage, searchMode]) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className={classNames('home-page')} onContextMenu={e => e.preventDefault()}>
            <TopNavbar />
            <HeadVideo genresList={genresList} />
            <Carousel type={'new'} genresList={genresList} favoritesList={favoritesList} updateFavoritesList={updateFavoritesList}/>
            <Carousel type={'now'} genresList={genresList} favoritesList={favoritesList} updateFavoritesList={updateFavoritesList}/>
            <FilterBar title={'Genres'} genresList={genresList} getSelected={getSelectedGenre}/>
            <MoviesList genresList={genresList} moviesList={moviesList} favoritesList={favoritesList} updateFavoritesList={updateFavoritesList} style={{minHeight: '80vh'}}/>
            <ButtomNavbar currentPage={currentPage} genreSelected={genreSelected} pageNavigation={getMoviesPagination} getSearchValue={getSearchValue} getSearchMode={getSearchMode}/>
            <div style={{marginTop: 200}}></div>
            <Footer />
        </div>
    )
}

export default HomePage;