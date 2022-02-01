import React, { Fragment, Suspense, useEffect, useState } from 'react';
import { Icon, MovieCard } from '../../components';

const deltas = {
    left: -200,
    right: 200,
    null: 0
}

const baseUrl = 'https://image.tmdb.org/t/p/original';

function CastCarousel({title, cast}) {

    const [controlInterval, setControlInterval] = useState(null);


    const scrollOnMouseWheel = (event) => {
        const carousel = document.querySelector(`#${title.split(' ')[0]}Carousel`);
        event.preventDefault();
        if(!carousel) return;
        carousel.scrollLeft += event.deltaY;
    }

    const controlScroll = (delta) => {
        const carousel = document.querySelector(`#${title.split(' ')[0]}Carousel`);
        carousel.scrollLeft += delta;
    }

    const continuesScrollOnControlClick = (delta) => {
        const deltaX = deltas[delta];
        setControlInterval(setInterval(() => controlScroll(deltaX), 200))
    }

    const stopScrollOnControlBlur = () => {
        clearInterval(controlInterval);  
    }

    useEffect(() => {
        const carousel = document.querySelector(`#${title.split(' ')[0]}Carousel`);
        carousel.addEventListener('wheel', scrollOnMouseWheel);
        return function cleanup() {
            carousel.removeEventListener('wheel', scrollOnMouseWheel);
        }
    },[]) // eslint-disable-line react-hooks/exhaustive-deps

    const drawCards = () => {
        const cardsNodeList  = (cast)?.map((actor, index) => {
            return <Fragment key={index}>
                    <Suspense fallback={<div className="cast-card"></div>}>
                        <CastCard props={{image: actor.profile_path, id: actor.id, name: actor.name}}/>
                    </Suspense>
                </Fragment>
        });

        return cardsNodeList;
    }
    
    const drawCardsDummy = () => {
        const dummyCardsList = (new Array(5)).fill(null);
        const cardsNodeList  =  dummyCardsList?.map((movie, index) => {
            return <Fragment key={index}><MovieCard /></Fragment>
        })

        return cardsNodeList;
    }

    const CastCard = (props) => {
        const image = props.props?.image;
        const id = props.props?.id;
        const name = props.props?.name;
        console.log(baseUrl + image)
        return (
            <div 
                id={`cast${id}`} 
                className="cast-card"
                style={{backgroundImage: `url(${baseUrl + image})`}}
            >
                <div className={'cast-card-overlay flex-column'}>
                    <div className={'cast-card-name'}>
                        {name}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <section id={`${title.split(' ')[0]}Section`}>
            <h1>{title}</h1>
            <div className={'section-content new-releases flex-row flex-center shadow'}>
                <div className={'land-slider flex-row flex-row-center-vert'}>
                    <div 
                        className={'control left flex-column flex-center '}
                        onClick={() => controlScroll(-200)}
                        onMouseDown={() => continuesScrollOnControlClick('left')}
                        onMouseUp={stopScrollOnControlBlur}
                    >
                        <Icon icon={'chevron-left'}/>
                    </div>
                    <div  id={`${title.split(' ')[0]}Carousel`} className={'carousel land-scroll flex-row flex-row-center-vert'}>
                        {cast.length > 0
                            ?
                            drawCards()
                            :
                            drawCardsDummy()
                        }
                    </div>
                    <div 
                        className={'control right flex-column flex-center'} 
                        onClick={() => controlScroll(200)}
                        onMouseDown={() => continuesScrollOnControlClick('right')}
                        onMouseUp={stopScrollOnControlBlur}
                    >
                        <Icon icon={'chevron-right'}/>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CastCarousel;