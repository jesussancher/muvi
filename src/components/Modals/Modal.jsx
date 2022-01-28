import React, { useEffect, createRef } from 'react';
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

    useEffect(() => {
        document.addEventListener('click', closeOnClickOutside);
        return function cleanup() {
            document.removeEventListener('click', closeOnClickOutside);
        } 
    })

    return (
        <div ref={container} className={classNames('modal-wrapper flex-column flex-center')}>
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
                    <Button text={'Try again'} onClick={close}/>
                </div>
            </div>
        </div>
    )
}

export default Modal;