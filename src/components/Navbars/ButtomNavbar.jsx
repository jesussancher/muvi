import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    TransitionGroup,
    CSSTransition
  } from "react-transition-group";
import { Icon } from '..';
import './ButtomNavbarStyles.css';

function ButtomNavbar(props) {

    let location = useLocation();
    const navigate = useNavigate();

    const goHome = () => {
        console.log("location", location);
        navigate('/', { replace: true });

    }

    const goFavorites = () => {
        console.log("location", location);
        navigate('/favorites', { replace: true });

    }

    return <div className={'buttom-navbar inner-shadow shadow'}>
        <div className={'icons-container flex-row flex-center'}>
            <div className={'buttom-navbar-button flex-row flex-center'} onClick={goHome}>
                <Icon icon={'home'} light/>
                <span className={'buttom-navbar-text'}>
                    Home
                </span>
            </div>
            <div className={'buttom-navbar-button flex-row flex-center'} onClick={goFavorites}>
                <Icon icon={'favorite-outline'} light/>
                <span className={'buttom-navbar-text'}>
                    Favorites
                </span>
            </div>
        </div>
    </div>
}

export default ButtomNavbar