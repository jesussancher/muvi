import classNames from 'classnames';
import React, { useEffect, useState, Fragment } from 'react';
import { TopNavbar, ButtomNavbar, Footer } from '../../components';
import { getAllGenresList } from '../../utils/API/API';
import Carousel from '../Home/Carousel';
import FilterBar from '../Home/FilterBar';
import'../Home/HomePageStyles.css';
import MoviesList from '../Home/MoviesList';

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
                        <Carousel movies={genre.list} title={genre.genre} genresList={genresList} favoritesList={favoritesList} updateFavoritesList={updateFavoritesList}/>
                        {/* <MoviesList 
                            fromFavorites 
                            title={genre.genre} 
                            style={sectionStyle}
                            className={'shadow'}
                            moviesList={genre.list} 
                            favoritesList={favoritesList} 
                            childrenStyle={sectionChildrenStyle}
                            updateFavoritesList={updateFavoritesList} 
                        /> */}
                    </Fragment>
                )
            })}
            <ButtomNavbar />
            <Footer />
        </div>
    )
}

const sectionStyle = {
    backgroundColor: 'var(--background-color-darker)',
    paddingTop: 10,
    paddingBottom: 20,
    marginBottom: 20,
}

const sectionChildrenStyle = {
    overflow: 'auto',
    maxHeight: 'calc((((100vw - 60px) / 5) - 13px) * 3.5)'
}

export default FavoritesPage;