import React from 'react';
import './CardsStyles.css';

function NewReleaseCard(props) {

    const {
        rate,
        // date,
        genre,
        title,
        image,
    } = props;

    const baseUrl = 'https://image.tmdb.org/t/p/original';

    return (
        <div className={'card release'} style={{backgroundImage: `url(${baseUrl+image})`}}>
            <div className={'card-info-container'}>
                <div className={'card-info-content flex-column'}>
                    <div className={'card-rate'}>
                        <i className={`icon-star-contain`} />{rate}
                    </div>
                    <div className={'card-title'}>
                        {title}
                    </div>
                    <div className={'card-genre'}>
                        {genre} 
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default NewReleaseCard;