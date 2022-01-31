import classNames from 'classnames';
import React, { useEffect, useState, Fragment } from 'react';
import { TopNavbar, ButtomNavbar } from '../../components';
import'../Home/HomePageStyles.css';
import MoviesList from '../Home/MoviesList';

function FavoritesPage() {

    const [favoritesList, setFavoritesList] = useState([]);
    const [sortedList, setSortedList] = useState([]);

    const updateFavoritesList = (list) => {
        setFavoritesList(list);
    }

    const sortListByCategory = (list) => {
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

    useEffect(() => {
        sortListByCategory(favoritesList);
    }, [favoritesList])

    return (
        <div className={classNames('home-page')} onContextMenu={e => e.preventDefault()}>
            <TopNavbar />
            <div style={{marginTop: 80}}></div>
            <h1 style={{marginLeft: 30}}>My Favorites</h1>
            {Object.values(sortedList).map((genre, index) => {
                return (
                    <Fragment key={index+genre}>
                        <MoviesList fromFavorites title={genre.genre} moviesList={genre.list} favoritesList={favoritesList} updateFavoritesList={updateFavoritesList} style={sectionStyle} className={'inner-shadow'}/>
                    </Fragment>
                )
            })}
            <ButtomNavbar />
        </div>
    )
}

const sectionStyle = {
    backgroundColor: 'var(--background-color-darker)',
    paddingTop: 10,
    paddingBottom: 10,
    // marginBottom: 10
}

export default FavoritesPage;