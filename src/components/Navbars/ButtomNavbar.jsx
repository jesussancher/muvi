import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Icon, SearchInput } from '..';
import './ButtomNavbarStyles.css';

function ButtomNavbar(props) {

    const [open, setOpen] = useState(false);

    const {
        pageNavigation,
        getSearchValue
    } = props

    let location = useLocation();
    const navigate = useNavigate();

    const goHome = () => {
        navigate('/', { replace: true });

    }

    const goFavorites = () => {
        navigate('/favorites', { replace: true });
    }

    const toggleOpenNavbar = () => {
        setOpen(prev => prev = !prev);
    }

    const closeNavbar = () => {
        setOpen(false);
    }

    const closeOnClickOutside = (event) => {
        const buttomRef = document.querySelector('#buttomNavbar');
        const target = event.target;
        if(!buttomRef?.contains(target)) {
            closeNavbar();
        }
    };

    const closeOnEscape = (event) => {
        if([27,13].includes(event.which)) {
            closeNavbar();
        }
    }   

    const didMount = () => {
        document.addEventListener('click', closeOnClickOutside);
        document.addEventListener('keydown', closeOnEscape);
    };

    const willUnmount = () => {
        document.removeEventListener('click', closeOnClickOutside);
        document.removeEventListener('keydown', closeOnEscape);
    };

    useEffect(() => {
        didMount();
        return function cleanup() {
            willUnmount();
        } 
    },[]) // eslint-disable-line react-hooks/exhaustive-deps

    return <div id={'buttomNavbar'} className={classNames('buttom-navbar inner-shadow shadow', {'open': open})}>
                {open && <div  className={classNames('buttom-navbar-searcher')}>
                        <SearchInput icon={'search'} onValueChange={getSearchValue} />
                </div>}
                <div className={'icons-container flex-row flex-center'}>
                    <div className={'ribbon'}>

                    </div>
                    {pageNavigation && <div className={classNames('buttom-prev flex-row flex-center', {'open': open})} onClick={() => pageNavigation(-1)}>
                            <Icon icon={'chevron-left'} />
                    </div>}
                    {location.pathname === '/' && <div className={classNames('buttom-navbar-button flex-row flex-center', {'open': open})} onClick={toggleOpenNavbar}>
                        <Icon icon={'search'} light/>
                        <span className={'buttom-navbar-text'}>
                            Search
                        </span>
                    </div>}
                    <div className={classNames('buttom-navbar-button flex-row flex-center', {'active': location.pathname === '/'})} onClick={goHome}>
                        <Icon icon={'home'} light/>
                        <span className={'buttom-navbar-text'}>
                            Home
                        </span>
                    </div>
                    <div className={classNames('buttom-navbar-button flex-row flex-center', {'active': location.pathname === '/favorites'})} onClick={goFavorites}>
                        <Icon icon={'favorite-outline'} light/>
                        <span className={'buttom-navbar-text'}>
                            Favorites
                        </span>
                    </div>
                    {pageNavigation && <div className={classNames('buttom-next flex-row flex-center', {'open': open})} onClick={() => pageNavigation(1)}>
                        <Icon icon={'chevron-right'} />
                    </div>}
                </div>
            </div>
}

export default ButtomNavbar