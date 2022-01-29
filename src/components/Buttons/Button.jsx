import React from 'react';
import { Loader } from '..';
import './ButtonStyles.css';

function Button(props) {

    const {
        text,
        type,
        style,
        onClick,
        loading,
        className,
        onMouseEnter,
    } = props;

    return <button type={type} onClick={onClick} onMouseEnter={onMouseEnter} className={className} style={style}>
        {loading 
            ?
            <Loader color={'dark'} size={30}/>
            :
            text
        }
        </button>
}

export default Button