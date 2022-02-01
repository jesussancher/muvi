import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { TopNavbar, Footer, ButtomNavbar } from '../../components';
import { tmdbRequest } from '../../utils/API/API';
import CastCarousel from './CastCarousel';
import MovieDetails from './MovieDetails';


function DetailsPage() {

    const param = useParams();


    const [movieDetails, setMovieDetails] = useState(null);
    const [movieCredits, setMovieCredits] = useState(null);

    const getMovieDetails = async (id) => {
        const details = await tmdbRequest(id);
        setMovieDetails(details);
    }

    const getMovieCredits = async (id) => {
        const credits = await tmdbRequest(`${id}/credits`);
        setMovieCredits(credits);
    }

    useEffect(() => {
        getMovieDetails(param.id);
        getMovieCredits(param.id);
    },[param.id])

    return (
        <div className={classNames('home-page')} onContextMenu={e => e.preventDefault()}>
            <TopNavbar />
            <ButtomNavbar />
            <MovieDetails movieDetails={movieDetails} />
            <CastCarousel title={'Cast'} cast={movieCredits ? movieCredits.cast : []}/>
            <div style={{marginTop: 200}}></div>
            <Footer />
        </div>
    )
}

export default DetailsPage;