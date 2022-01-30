import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { TopNavbar } from '../../components';
import { discoverMoviesByGenre, getAllGenresList } from '../../utils/API/API';
import'./HomePageStyles.css';
import FilterBar from './FilterBar';
import NewReleases from './NewReleases';

function HomePage(props) {

    const [genresList, setGenresList] = useState([]);
    
    const getGenresList = async() => {
        const genres = await getAllGenresList('now_playing');
        const byGenre = await discoverMoviesByGenre();
        console.log(byGenre)
        setGenresList(genres.genres);
    }

    // Request now playing movies
    useEffect(() => {
        getGenresList();
    },[])

    return (
        <div className={classNames('home-page')} onContextMenu={e => e.preventDefault()}>
            <TopNavbar />
            <NewReleases genresList={genresList} />
            <FilterBar genresList={genresList} />
        </div>
    )
}

export default HomePage;