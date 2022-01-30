import React, { useEffect, useState } from 'react';
import { Input, MuviLogo } from '..';
import './TopNavbarStyles.css';

function TopNavbar() {

    const [hideNavbar, setHideNavbar] = useState(false);

    const getScrollValue = () => {
        var y = window.scrollY;
        setHideNavbar(y> 40) 
    }
    

    useEffect(() => {
        document.addEventListener("scroll", getScrollValue);
        return function cleanup() {
            document.removeEventListener("scroll", getScrollValue);
        }
    },[])

    return (
        <div style={{top: hideNavbar ? '-100px' : 0}} className={'top-navbar-container flex-row'}>
            <MuviLogo width={80} />
            <Input style={{height: 16}} icon={'search'} name={'search'} type={'text'} noBorder animated={'right'}/>
        </div>
    )
}

export default TopNavbar;