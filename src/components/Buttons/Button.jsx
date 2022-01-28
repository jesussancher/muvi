import React from 'react';

function Button(props) {

    const {
        text,
        type,
        style,
        onClick,
        className,
        onMouseEnter
    } = props;

    return <button type={type} onClick={onClick} onMouseEnter={onMouseEnter} className={className} style={style}>{text}</button>
}

export default Button