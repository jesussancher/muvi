import React, { useState } from 'react';
import classNames from 'classnames';
import { passWordRegexTest } from '../../utils/Auth/auth';
import  './InputStyles.css';

function Button(props) {

    const [isValid, setIsValid] = useState(false);
    const [isFocused, setIsFocused] = useState(true);

    const [value, setValue] = useState('');

    const invalidMessages = {
        email: 'Try a valid email!',
        password: 'Password must contain letters and numbers'
    }

    const {
        type,
        name,
        text,
        style,
        onClick,
        className,
        placeholder,
        onMouseEnter
    } = props;

    const handleOnChange = (evt) => {
        const newValue = evt.target.value;

        if((type === 'password' && passWordRegexTest(newValue)) || 
        (type === 'email' && newValue.includes('@') && newValue.includes('.'))) 
        {
            setIsValid(true);
        } else {
            setIsValid(false);
        }

        setValue(newValue);
    }

    const handleOnInvalid = () => {
        setIsValid(false)
    }

    const handleOnFocus = () => {
        setIsFocused(true);
    }

    const handleOnBlur = () => {
        setIsFocused(false);
    }



    const onEnterPressed = (evt) => {
        if(evt.which === 13) {
            const totalInputs = document.getElementsByTagName('input');
            for(let i = 0; i < totalInputs.length-1; i++) {
                if(totalInputs[i].id === `${name}Input` && isValid) {
                    totalInputs[i+1].focus();
                }
            }
        }
    }


    return (
        <label htmlFor={name} className={'flex-column flex-center'}>
            <span className={'label-text-group flex-row'}>
                <span className={classNames('text', {'focused': isFocused})}>{text}</span>
                {!isValid && value !== '' && <span className={'invalid-text'}>{invalidMessages[type]}</span>}
            </span>
            <input 
                type={type} 
                id={`${name}Input`}
                name={name} 
                value={value}
                style={style}
                onClick={onClick}
                autoComplete={'off'}
                onBlur={handleOnBlur}
                onFocus={handleOnFocus}
                onChange={handleOnChange}
                placeholder={placeholder}
                onKeyDown={onEnterPressed}
                onInvalid={handleOnInvalid}
                onMouseEnter={onMouseEnter} 
                className={classNames(className)}  
            />
        </label>
    )
}
export default Button