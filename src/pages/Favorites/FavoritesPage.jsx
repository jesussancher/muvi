import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { TopNavbar, ButtomNavbar } from '../../components';
import'../Home/HomePageStyles.css';
import MoviesList from '../Home/MoviesList';

function FavoritesPage() {

    const [favoritesList, setFavoritesList] = useState([]);


    const updateFavoritesList = (list) => {
        setFavoritesList(list);
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


    return (
        <div className={classNames('home-page')} onContextMenu={e => e.preventDefault()}>
            <TopNavbar />
            <div style={{marginTop: 30}}></div>
            <MoviesList fromFavorites title={'My Favorites'} moviesList={favoritesList} favoritesList={favoritesList} updateFavoritesList={updateFavoritesList}/>
            <ButtomNavbar />
        </div>
    )
}

export default FavoritesPage;