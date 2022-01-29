import React from 'react';
import { Input, MuviLogo } from '..';
import './TopNavbarStyles.css';

function TopNavbar() {
    return (
        <div className={'top-navbar-container flex-row'}>
            <MuviLogo width={80} />
            <Input style={{height: 16}} icon={'search'} name={'search'} type={'text'} noBorder animated={'right'}/>
        </div>
    )
}

export default TopNavbar;