import classNames from 'classnames';
import React from 'react';
import './IconStyles.css';

function Icon(props){

    const {
        style,
        icon,
        onClick,
        className
    } = props;

    return (
        <span className={classNames(`icon-container flex-row flex-center ${className}`)} onClick={onClick}>
            <i className={`icon-${icon}`} style={style} />
        </span>
    )
}

export default Icon