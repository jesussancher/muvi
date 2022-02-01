import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../utils/Auth/auth';
import './TopNavbarStyles.css';
import { MuviLogo } from '..';

function TopNavbar() {

    const [hideNavbar, setHideNavbar] = useState(false);
    const auth = useAuth();

    const getScrollValue = () => {
        var y = window.scrollY;
        setHideNavbar(y> 40) 
    }

    const signout = () => {
        auth.signout();
    }
    

    useEffect(() => {
        document.addEventListener("scroll", getScrollValue);
        return function cleanup() {
            document.removeEventListener("scroll", getScrollValue);
        }
    },[])

    return (
        <div style={{top: hideNavbar ? '-100px' : 0}} className={'top-navbar-container flex-row '}>
            <span className={'flex-row flex-center'}>
                <MuviLogo width={100} />
                <h4 style={{marginLeft: 10}}>
                    Blocks of joy
                </h4>
            </span>
            <div className={'buttom-navbar-button top flex-row flex-center'} onClick={signout}>
                <FontAwesomeIcon icon={faSignOutAlt} />
                <span className={'buttom-navbar-text'}>
                    Sign out
                </span>
            </div>
        </div>
    )
}

export default TopNavbar;