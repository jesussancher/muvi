import React, { useState, createRef, useEffect } from 'react';
import classNames from 'classnames';
import { passWordRegexTest } from '../../utils/Auth/auth';
import  './InputStyles.css';
import { Icon } from '..';

function Input(props) {

    const [isValid, setIsValid] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [isPasswordShown, setIsPasswordShown] = useState(false);

    const [value, setValue] = useState('');

    const inputRef = createRef();
    const labelRef = createRef();

    const invalidMessages = {
        email: 'Try a valid email!',
        password: 'Password must contain letters and numbers'
    }

    const {
        type,
        icon,
        name,
        text,
        style,
        onClick,
        animated,
        noBorder,
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
        onValueChange && onValueChange(newValue);
        
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

    const toggleShowPassword = () => {
        setIsPasswordShown(prev => prev = !prev);
    }

    const focusOnClick = () => {
        inputRef.current.focus();
    }

    function setCaretPosition() {
        const ctrl = inputRef.current;
        const pos = ctrl.value.length;
        if (ctrl.setSelectionRange) {
          ctrl.focus();
          ctrl.setSelectionRange(pos, pos);
        } else if (ctrl.createTextRange) {
          var range = ctrl.createTextRange();
          range.collapse(true);
          range.moveEnd('character', pos);
          range.moveStart('character', pos);
          range.select();
        }
    }

    useEffect(() => {
        if(type !== 'password') return;
        setCaretPosition();
    },[type,isPasswordShown]) // eslint-disable-line react-hooks/exhaustive-deps

    const animationStyles = {
        'left': {'left-animation': animated},
        'right': {'right-animation': animated}
    }

    return (
        <label ref={labelRef} htmlFor={name} className={classNames('flex-column flex-center', {'animated': animated}, animationStyles[animated])} onClick={focusOnClick}>
            {text && <span className={'label-text-group flex-row'}>
                    <span className={classNames('text', {'focused': isFocused})}>{text}</span>
                    {!isValid && value !== '' && <span className={'invalid-text'}>{invalidMessages[name]}</span>}
                </span>
            }
            <div className={
                classNames('input-container flex-row flex-row-center-vert', 
                {'focused': isFocused}, 
                {'no-border': noBorder && value === ''})
                }
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
                    type={isPasswordShown ? 'text' : type} 
                    className={classNames('visible-input')}  
                />
                {name === 'password' && <Icon icon={!isPasswordShown ? 'icon-hide' : 'icon-show'} style={{ fontSize: '1em' }} onClick={toggleShowPassword}/>}
                {(name !== 'password' && icon) && <Icon icon={`icon-${icon}`} onClick={onIconClick}/>}
            </div>
        </label>
    )
}
export default Input