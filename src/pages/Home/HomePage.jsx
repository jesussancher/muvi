import classNames from 'classnames';
import React from 'react';
import { TopNavbar } from '../../components';
import'./HomePageStyles.css';

function HomePage(props) {

    return (
        <div className={classNames('home-page')}>
            <TopNavbar />
        </div>
    )
}

export default HomePage;