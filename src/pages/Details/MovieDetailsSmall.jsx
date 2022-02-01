import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWallet } from '@fortawesome/free-solid-svg-icons';
import { faCalendarDay } from '@fortawesome/free-solid-svg-icons';
import { faMoneyBillWave } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-solid-svg-icons';

import './MovieDetailsSmallStyles.css';
import { getMonthName, getYearShort } from '../../utils/Misc/dateTime';
import { MuviLogo } from '../../components';

const baseUrl = 'https://image.tmdb.org/t/p/original';

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

function kFormatter(num) {
    switch (true) {
        case Math.abs(num) > 999999 && Math.abs(num) < 999999999:
            return Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'M';
        case Math.abs(num) > 999999999:
            return Math.sign(num)*((Math.abs(num)/1000000).toFixed(1)) + 'M';
        default:
            break;
    }

}

function MovieDetailsSmall({movieDetails}) {

    // const [posterUrl, setPosterUrl] = useState('');
    const posterUrl = baseUrl + movieDetails?.backdrop_path;
    const title = movieDetails?.title;
    const rate = movieDetails?.vote_average;
    const genre = movieDetails?.genres[0]?.name;
    const overview = movieDetails?.overview;
    const releaseDate = movieDetails?.release_date?.split('-');
    const company = movieDetails?.production_companies[0];
    // console.log(formatter.format(movieDetails?.budget)?.split('000,000.00')[0])
    // console.log(formatter.format(movieDetails?.revenue)?.split('000,000.00')[0])
    const info = [
        {
            icon: faClock,
            text: Math.floor(movieDetails?.runtime / 60)
        },
        {
            icon: faCalendarDay,
            text: `${getMonthName(releaseDate && releaseDate[1])} ${releaseDate && releaseDate[2]} ${getYearShort(releaseDate && releaseDate[0])} `
        },
        {
            icon: faWallet,
            text: formatter.format(movieDetails?.budget).split(',')[0]+'M'
        },
    ]


    return (
        <div id={'movieDetailsSmall'}>
            <div className={'details-poster-sm'} style={{backgroundImage: `url(${posterUrl})`}}>
                <div className={'movie-overlay flex-column'}>
                    <div className={'movie-overlay-details'}>
                        {rate && <div className={'card-rate'}>
                            <i className={`icon-star-contain`} />{rate}
                        </div>}
                        {title && <div className={'card-title'} style={{lineHeight: '1em', margin: 0}}>
                            {title}
                        </div>}
                        {genre && <div className={'card-genre'}>
                            {genre} 
                        </div>}
                        <div className={'details-company-sm flex-row flex-center shadow'}>
                            {company?.logo_path 
                                ? 
                                <img src={baseUrl + company?.logo_path} alt={company?.name + " logo"}/>
                                :
                                <MuviLogo />
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className={'details-overview-sm'} >
                {overview && <p>
                    {overview}
                </p>}
            </div>
            <div className={'details-tags-sm flex-row'}>
                {info.map((data, index) => {
                    return (
                        <span key={index} className={'details-tag'} style={{...data.style}}>
                            <FontAwesomeIcon icon={data.icon} />
                            <span className={'details-tag-text'} style={{...data.style}}>
                                {data.text}
                            </span>
                        </span>
                    )})
                }
            </div>
        </div>
    )
}

export default MovieDetailsSmall;