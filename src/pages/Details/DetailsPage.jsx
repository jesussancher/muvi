import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { TopNavbar, Footer, ButtomNavbar } from '../../components';
import { tmdbRequest } from '../../utils/API/API';
import MovieDetailsSmall from './MovieDetailsSmall';


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
            <MovieDetailsSmall movieDetails={movieDetails} movieCredits={movieCredits} />
            <Footer />
        </div>
    )
}

export default DetailsPage;