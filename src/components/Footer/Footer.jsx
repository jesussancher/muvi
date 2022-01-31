import React from 'react';
import { MuviLogo } from '..';
import './FooterStyles.css';

function Footer() {

    return <footer className={'flex-column flex-center'}>
        <MuviLogo />
        <p>Muvi is part of <a href="https://57blocks.io/" target={'_blank'} rel={'noreferrer'}>57Blocks</a></p>
        <p>Designed and developed by <a href="https://github.com/jesussancher/" target={'_blank'} rel={'noreferrer'}>Jesús Sánchez</a></p>
        <p>All rights Reserved. © 2022 Muvi, Inc.</p>
    </footer>
}

export default Footer;