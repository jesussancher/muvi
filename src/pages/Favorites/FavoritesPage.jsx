import classNames from 'classnames';
import React, { useEffect, useState, Fragment } from 'react';
import { TopNavbar, ButtomNavbar, Footer } from '../../components';
import { getAllGenresList } from '../../utils/API/API';
import Carousel from '../Home/Carousel';
import FilterBar from '../Home/FilterBar';
import'../Home/HomePageStyles.css';

function FavoritesPage() {

    const [favoritesList, setFavoritesList] = useState([]);
    const [sortedList, setSortedList] = useState([]);
    const [sortedFilterList, setSortedFilterList] = useState([]);
    const [genresList, setGenresList] = useState([]);
    const [genresFilterList, setGenresFilterList] = useState([]);
    const [genreSelected, setGenreSelected] = useState({});

    const getSelectedGenre = (genre) => {
        setGenreSelected(genre);
    }

    const getGenresList = async() => {
        const genres = await getAllGenresList();
        setGenresList(genres.genres);
    }

    const updateFavoritesList = (list) => {
        setFavoritesList(list);
    }

    const sortListByCategory = (list, genresList) => {
        let listed = {};

        list.forEach((movie) => {
            if(listed[movie.genreId]) {
                listed[movie.genreId].list.push(movie);
            } else {
                listed[movie.genreId] = {};
                listed[movie.genreId].genre = movie.genre;
                listed[movie.genreId].list = [movie];
            }
        })

        const filteredGenres = genresList.filter(genre => Object.keys(listed).includes(genre.id.toString()));
        setGenresFilterList(filteredGenres);
        setSortedList(listed);
    }

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

    // Request now playing movies
    useEffect(() => {
        getGenresList();
    },[]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        sortListByCategory(favoritesList, genresList);
    }, [favoritesList, genresList])

    useEffect(() => {

        const filteredMoviesList = sortedList[genreSelected.id];

        if(filteredMoviesList) {
            setSortedFilterList([filteredMoviesList])
        } else {
            setSortedFilterList(sortedList);
        }

    },[sortedList, genreSelected])

    return (
        <div className={classNames('home-page')} onContextMenu={e => e.preventDefault()}>
            <TopNavbar />
            <div style={{marginTop: 80}}></div>
            <FilterBar genresList={genresFilterList} getSelected={getSelectedGenre} title={'My Favorites'}/>
            <div style={{marginTop: 30}}></div>
            {Object.values(sortedFilterList).map((genre, index) => {
                return (
                    <Fragment key={index+genre}>
                        <Carousel movies={genre.list} title={genre.genre} fromFavorites genresList={genresList} favoritesList={favoritesList} updateFavoritesList={updateFavoritesList}/>
                    </Fragment>
                )
            })}
            <ButtomNavbar />
            <div style={{marginTop: 200}}></div>
            <Footer />
        </div>
    )
}

export default FavoritesPage;