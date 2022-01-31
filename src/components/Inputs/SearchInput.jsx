import React, { useState, createRef, useEffect } from 'react';
import classNames from 'classnames';
import { passWordRegexTest } from '../../utils/Auth/auth';
import  './InputStyles.css';
import { Icon } from '..';

function SearchInput(props) {

    const [isValid, setIsValid] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const [value, setValue] = useState('');

    const inputRef = createRef();
    const labelRef = createRef();

    const {
        type,
        icon,
        name,
        style,
        onClick,
        animated,
        onIconClick,
        placeholder,
        onMouseEnter,
        onValueChange,
        getValidation
    } = props;

    const handleOnChange = (evt) => {
        evt.preventDefault();
        const newValue = evt.target.value;
        const loginFileds = {
            'email': newValue.includes('@') && newValue.includes('.'),
            'password': passWordRegexTest(newValue)
        }

        setValue(newValue);
        onValueChange && onValueChange(newValue.replace(" ", "%20"));
        
        if(newValue === '') return;
        getValidation && getValidation(loginFileds[name])
        setIsValid(loginFileds[name]);
    }

    const handleOnInvalid = () => {
        setIsValid(false);
    }

    const handleOnFocus = () => {
        setIsFocused(true);
    }

    const handleOnBlur = () => {
        setIsFocused(false);
    }

    const onEnterPressed = (evt) => {
        if(evt.which === 13) {
            const parent = labelRef.current.parentNode.nodeName;
            if(parent === 'FORM') {
                const totalInputs = document.getElementsByClassName('visible-input');
                for(let i = 0; i < totalInputs.length-1; i++) {
                    if(totalInputs[i].id === `${name}Input` && isValid) {
                        isValid && totalInputs[i+1].focus();
                    }
                }
            } else {
                onIconClick && onIconClick(evt)
            }
        }
    }

    const focusOnClick = () => {
        inputRef.current.focus();
    }

    const animationStyles = {
        'left': {'left-animation': animated},
        'right': {'right-animation': animated}
    }

    useEffect(() => {
        setIsFocused(true);
        const inputElement = document.getElementById(`${name}Input`);
        inputElement?.focus();
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <label ref={labelRef} htmlFor={name} className={classNames('flex-column flex-center', {'animated': animated}, animationStyles[animated])} onClick={focusOnClick}>
            <div className={
                classNames('input-container search flex-row flex-row-center-vert', {'focused': isFocused})}
                style={style}
                >
                <input 
                    ref={inputRef}
                    id={`${name}Input`}
                    name={name} 
                    value={value}
                    onClick={onClick}
                    autoComplete={'off'}
                    onBlur={handleOnBlur}
                    onFocus={handleOnFocus}
                    onChange={handleOnChange}
                    placeholder={placeholder}
                    onKeyDown={onEnterPressed}
                    onInvalid={handleOnInvalid}
                    onMouseEnter={onMouseEnter} 
                    type={type} 
                    className={classNames('visible-input')}  
                />
                {icon && <Icon icon={icon} onClick={onIconClick}/>}
            </div>
        </label>
    )
}
export default SearchInput