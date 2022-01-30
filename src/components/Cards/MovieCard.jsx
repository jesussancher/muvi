import classNames from 'classnames';
import React, { useState } from 'react';
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
        if(!getFavoritesList) return;
        getFavoritesList(addToFavoriteList(id));
        favAnimation();
    }

    const handleRemoveToFavoriteList = () => {
        if(!getFavoritesList) return;
        getFavoritesList(removeFromFavoriteList(id));
        favAnimation();
    }

    const favAnimation = () => {
        const favInterval = setInterval(() => {
            setFavoriteAnimation(true);
        }, 10);
        setTimeout(() => {
            clearInterval(favInterval);
            setFavoriteAnimation(false);
        }, 2000);
    }

    return (
        <div 
            className={classNames('card', {'release': release})} 
            style={{backgroundImage: `url(${baseUrl+image})`}}
            onDoubleClick={isFavorite ? handleRemoveToFavoriteList : handleAddToFavoriteList}
            >
            <div className={classNames('new-fav flex-row flex-center', favoriteAnimation && (isFavorite ? 'add-animate' : 'remove-animate'))}>
                { isFavorite
                    ?
                    <i className={'icon-favorite-contain'}/>
                    :
                    <i className={'icon-favorite-outline'}/>
                }
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
                    {(rate !== undefined || rate !== null) && <div className={'card-rate'}>
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