import classNames from 'classnames';
import React from 'react';
import './IconStyles.css';

const colorTheme = {
    light: '#5bf192',
    dark: '#032541'
}

function Icon(props){

    const {
        icon,
        dark,
        light,
        style,
        onClick,
        className
    } = props;

    return (
        <span className={classNames(`icon-container flex-row flex-center ${className}`)} onClick={onClick}>
            <i className={`icon-${icon}`} style={{...style, color: (dark && colorTheme['dark']) || (light && colorTheme['light'])}} />
        </span>
    )
}

export default Icon