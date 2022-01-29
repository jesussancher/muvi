import React, { useState } from 'react';
import classNames from 'classnames';
import { passWordRegexTest } from '../../utils/Auth/auth';
import  './InputStyles.css';

function Input(props) {

    const [isValid, setIsValid] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [isPasswordShown, setIsPasswordShown] = useState(false);

    const [value, setValue] = useState('');
    const [hiddenPasswordValue, setHiddenPasswordValue] = useState('');

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
        placeholder,
        onMouseEnter,
        getValidation
    } = props;

    const handleOnChange = (evt) => {
        evt.preventDefault();
        const newValue = evt.target.value;
        const loginFileds = {
            'email': newValue.includes('@') && newValue.includes('.'),
            'password': passWordRegexTest(newValue)
        }

        const valueLength = newValue.length+1;
        const hide = (new Array(valueLength)).fill('·').join('');
        setHiddenPasswordValue(hide);

        setValue(newValue);
        
        if(newValue === '') return;
        getValidation(loginFileds[name])
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
        console.log("evt",evt)
        if(evt.which === 13) {
            const totalInputs = document.getElementsByClassName('visible-input');
            for(let i = 0; i < totalInputs.length-1; i++) {
                if(totalInputs[i].id === `${name}Input` && isValid) {
                    isValid && totalInputs[i+1].focus();
                }
            }
        }
    }

    const toggleShowPassword = () => {
        setIsPasswordShown(prev => prev = !prev);
    }

    return (
        <label htmlFor={name} className={'flex-column flex-center'}>
            <span className={'label-text-group flex-row'}>
                <span className={classNames('text', {'focused': isFocused})}>{text}</span>
                {!isValid && value !== '' && <span className={'invalid-text'}>{invalidMessages[name]}</span>}
            </span>
            <div className={classNames('input-container flex-row flex-row-center-vert', {'focused': isFocused})}>
                <input 
                    type={type} 
                    id={`${name}Input`}
                    value={isPasswordShown ? hiddenPasswordValue : value}
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
                    className={classNames('visible-input', {'password': name === 'password'}, {'hidden-password': isPasswordShown})}  
                />
                <input 
                    type={type} 
                    name={name} 
                    value={value}
                    onChange={handleOnChange}
                    autoComplete={'off'}
                    className={'invisible-nput'}
                />
                {name === 'password' && <i className={!isPasswordShown ? 'icon-hide' : 'icon-show'} style={{ fontSize: '0.6em' }} onClick={toggleShowPassword} />}
            </div>
        </label>
    )
}
export default Input