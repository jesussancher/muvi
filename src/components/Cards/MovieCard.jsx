import classNames from 'classnames';
import React, { useState } from 'react';
import { Icon } from '..';
import { addToFavoriteList, removeFromFavoriteList } from '../../utils/Misc/favorites';
import PosterFallback from '../../assets/images/fallback-poster.jpg';
import './CardsStyles.css';
import { useNavigate } from 'react-router-dom';

function MovieCard(props) {

    const navigate = useNavigate();

    const {
        id,
        rate,
        genre,
        title,
        image,
        genreId,
        release,
        isFavorite,
        fromFavorites,
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
        getFavoritesList(addToFavoriteList({
            id,
            vote_average: rate,
            genre,
            title,
            genreId,
            poster_path: image,
            release_date: release}));
        favAnimation('add');
    }

    const handleRemoveToFavoriteList = () => {
        if(!getFavoritesList) return;
        getFavoritesList(removeFromFavoriteList(id));
        favAnimation('remove');
    }

    const favAnimation = (type) => {
        const favInterval = setInterval(() => {
            setFavoriteAnimation(true);
        }, 10);
        setTimeout(() => {
            clearInterval(favInterval);
            setFavoriteAnimation(false);
        }, 2000);
    }
    
    const goToMovie = (id) => {
        navigate(`/movie/${id}`, { replace: true });
    }

    return (
        <div 
            className={classNames('card', {'release': release})} 
            style={{backgroundImage: `url(${image ? baseUrl+image : PosterFallback})`}}
            onClick={() => goToMovie(id)}
            onDoubleClick={id && isFavorite ? handleRemoveToFavoriteList : handleAddToFavoriteList}
            >
            <div className={classNames('new-fav flex-row flex-center', !fromFavorites && favoriteAnimation && (isFavorite ? 'add-animate' : 'remove-animate'))}>
                { isFavorite
                    ?
                    <i className={'icon-favorite-contain'} />
                    :
                    <i className={'icon-favorite-outline'} />
                }
            </div>
            <div 
                className={'card-favorite flex-row flex-center'}
                onMouseEnter={onEnterFavorite}
                onMouseLeave={onLeaveFavorite}
                onClick={id && isFavorite ? handleRemoveToFavoriteList : handleAddToFavoriteList}
            >
                <Icon icon={hoverFavorite || isFavorite ? 'favorite-contain' : 'favorite-outline'} />
            </div>
            <div className={'card-info-container'}>
                <div className={'card-info-content flex-column'}>
                    {id && (rate !== undefined || rate !== null)  && <div className={'card-rate'}>
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