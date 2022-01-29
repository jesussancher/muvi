import React from 'react';
import { SpinnerDotted } from 'spinners-react';
import './LoaderStyles.css';

function Loader(props) {

    const {
        color,
        size
    } = props;

    const colorDictionary = {
        dark: '#032541',
        light: '#5bf192'
    }

    return (
        <div className={'loader-container flex-row flex-center'}>
            <SpinnerDotted color={color ? colorDictionary[color] : '#5bf192'} secondarycolor={'#13b6dc'} size={size}/>
        </div>
    )
}

export default Loader;