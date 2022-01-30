import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { Icon } from '..';
import { addToFavoriteList, removeFromFavoriteList } from '../../utils/Misc/favorites';
import './CardsStyles.css';

function MovieCard(props) {

    const {
        id,
        rate,
        genre,
        title,
        image,
        release,
        isFavorite,
        getFavoritesList
    } = props;

    const baseUrl = 'https://image.tmdb.org/t/p/original';

    const [hoverFavorite, setHoverFavorite] = useState(false);
    const [favoriteAnimation, setFavoriteAnimation] = useState(false);

    const onEnterFavorite = () => {
        setHoverFavorite(true)
    }

    const onLeaveFavorite = () => {
        setHoverFavorite(false)
    }

    const handleAddToFavoriteList = () => {
        getFavoritesList(addToFavoriteList(id));
    }

    const handleRemoveToFavoriteList = () => {
        getFavoritesList(removeFromFavoriteList(id));
    }

    useEffect(() => {
        if(isFavorite) {
            const favInterval = setInterval(() => {
                setFavoriteAnimation(true);
            }, 10);
            setTimeout(() => {
                clearInterval(favInterval);
                setFavoriteAnimation(false);
                
            }, 2000);
        }
    },[isFavorite])


    return (
        <div 
            className={classNames('card', {'release': release})} 
            style={{backgroundImage: `url(${baseUrl+image})`}}
            onDoubleClick={isFavorite ? handleRemoveToFavoriteList : handleAddToFavoriteList}
            >
            <div className={classNames('new-fav flex-row flex-center', {'animate': favoriteAnimation})}>
                <i className={'icon-favorite-contain'}/>
            </div>
            <div 
                className={'card-favorite flex-row flex-center'}
                onMouseEnter={onEnterFavorite}
                onMouseLeave={onLeaveFavorite}
                onClick={isFavorite ? handleRemoveToFavoriteList : handleAddToFavoriteList}
            >
                <Icon icon={hoverFavorite || isFavorite ? 'favorite-contain' : 'favorite-outline'} />
            </div>
            <div className={'card-info-container'}>
                <div className={'card-info-content flex-column'}>
                    {rate && <div className={'card-rate'}>
                        <i className={`icon-star-contain`} />{rate}
                    </div>}
                    {title && <div className={'card-title'}>
                        {title}
                    </div>}
                    {genre && <div className={'card-genre'}>
                        {genre} 
                    </div>}
                    
                </div>
            </div>
        </div>
    )
}

export default MovieCard;