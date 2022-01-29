import React, { useEffect, createRef, useCallback } from 'react';
import classNames from 'classnames';
import './ModalStyles.css';
import Button from '../Buttons/Button';

function Modal(props) {

    const container = createRef();

    const {
        height,
        width,
        title,
        close,
        text,
    } = props;

    const breakChar = ' / ';

    const closeOnClickOutside = (event) => {
        const parent = container.current;
        const children = parent?.childNodes[0];
        const target = event.target;
        if(!children?.contains(target)) {
            close();
        }
    };

    const closeOnEscape = (event) => {
        if([27,13].includes(event.which)) {
            close();
        }
    }   

    const didMount = useCallback(() => {
        document.addEventListener('click', closeOnClickOutside);
        document.addEventListener('keydown', closeOnEscape);
    });

    const willUnmount = useCallback(() => {
        document.removeEventListener('click', closeOnClickOutside);
        document.removeEventListener('keydown', closeOnEscape);
    });

    useEffect(() => {
        didMount();
        return function cleanup() {
            willUnmount();
        } 
    },[didMount, willUnmount])

    return (
        <div ref={container} className={classNames('modal-wrapper flex-column flex-center')} tabIndex={0}>
            <div className={classNames('modal-container flex-column flex-column-center-land')} style={{height: height + 'px', width: width + 'px'}}>
                <div className={classNames('modal-title text-center')}>
                    {title.includes(breakChar) ? 
                        title.split(breakChar).map(text => {
                            return <h2 key={text+'Title'}>{text}</h2>
                        })
                        : 
                        <h2>{title}</h2>
                    }
                </div>
                <div className={classNames('modal-content flex-column flex-center')}>
                    {text.includes(breakChar) ? 
                        text.split(breakChar).map(content => {
                            return <p key={content+'Title'}>{content}</p>
                        })
                        : 
                        <p>{text}</p>
                    }
                </div>
                <div className={classNames('modal-action')}>
                    <Button text={'Try again'} onClick={close} style={{minWidth: 210}}/>
                </div>
            </div>
        </div>
    )
}

export default Modal;