import classNames from 'classnames';
import React from 'react';
import { TopNavbar } from '../../components';
import'./HomePageStyles.css';
import NewReleases from './NewReleases';

function HomePage(props) {


    return (
        <div className={classNames('home-page')} onContextMenu={e => e.preventDefault()}>
            <TopNavbar />
            <NewReleases />
        </div>
    )
}

export default HomePage;