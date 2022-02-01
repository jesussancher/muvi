import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Icon, SearchInput } from '..';
import './ButtomNavbarStyles.css';

function ButtomNavbar(props) {

    const [open, setOpen] = useState(false);
    const [hideNavbar, setHideNavbar] = useState(false);
    const [hideNavbarItems, setHideNavbarItems] = useState(false);

    const {
        pageNavigation,
        getSearchValue,
        genreSelected,
        getSearchMode,
        currentPage,
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

    useEffect(() => {
        getSearchMode && getSearchMode(open);
    },[open]) // eslint-disable-line react-hooks/exhaustive-deps

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


    const getScrollValue = () => {
        var y = window.scrollY;
        const bottomCondition = (window.innerHeight + Math.ceil(window.pageYOffset)) >= document.body.offsetHeight - 150;
        setHideNavbar(bottomCondition);

        const moviesListSection = document.querySelector('#moviesListSection');
        if(!moviesListSection) return;
        const topCondition = y > moviesListSection.offsetTop - 400 && y < moviesListSection.offsetTop + moviesListSection.offsetHeight + 400
        setHideNavbarItems(topCondition);
    }
    

    useEffect(() => {
        document.addEventListener("scroll", getScrollValue);
        return function cleanup() {
            document.removeEventListener("scroll", getScrollValue);
        }
    },[])

    return <div id={'buttomNavbar'} className={classNames('buttom-navbar inner-shadow shadow', {'open': open}, {'hide' : hideNavbar})}>
                {pageNavigation && <div className={classNames('ribbon', {'open': hideNavbarItems}, {'hide': open})}>
                    <b>{genreSelected.name ? genreSelected.name : 'All'}  </b>
                        {currentPage}
                </div> }
                {open && <div  className={classNames('buttom-navbar-searcher')}>
                        <SearchInput icon={'search flex-row flex-center'} onValueChange={getSearchValue} onIconClck={closeNavbar} />
                </div>}
                <div className={'icons-container flex-row flex-center'}>
                    {pageNavigation && <div className={classNames('buttom-prev flex-row flex-center', {'open': !hideNavbarItems || open})} onClick={() => pageNavigation(-1)}>
                            <Icon icon={'chevron-left'} />
                    </div>}
                    {location.pathname === '/' && <div className={classNames('buttom-navbar-button flex-row flex-center', {'open': open}, {'hide': !hideNavbarItems})} onClick={toggleOpenNavbar}>
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
                    {pageNavigation && <div className={classNames('buttom-next flex-row flex-center', {'open': !hideNavbarItems || open})} onClick={() => pageNavigation(1)}>
                        <Icon icon={'chevron-right'} />
                    </div>}
                </div>
            </div>
}

export default ButtomNavbar