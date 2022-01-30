import classNames from 'classnames';
import React from 'react';
import './TagsStyle.css';

function Tag(props) {

    const {
        id,
        text,
        dummy,
        index,
        active,
        onClick,
        textColor,
        backgroundColor,
    } = props;

    return (
        <span 
            id={`${id ? id.split(' ').join('') : index}Tag`}
            style={{backgroundColor: backgroundColor, color: textColor}}
             onClick={onClick}
             className={classNames('tag',{'dummy' : dummy}, {'active': active})}
        >
            {text}
        </span>
    )
}

export default Tag