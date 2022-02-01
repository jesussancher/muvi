import React, { useState, useEffect } from "react";
import ReactPlayer from 'react-player'
import './VideosStyles.css';

const baseUrl = 'https://www.youtube.com/watch?v=';
const baseBackfropUrl = 'https://image.tmdb.org/t/p/original';

function VideoPlayer(props) {

    const [playing, setPlaying] = useState(false);
    const [showFallBack, setShowFallBack] = useState(true);
    const {
        videoKey,
        videosList,
        className,
        backdrop,
        getDuration,
        getShowCallback
    } = props;

    const handleOnDuration = (duration) => {
        getDuration(duration)
    }

    const handleOnError = (error) => {
        console.log("Error", error)
    }

    const handleOnProgress = (progress) => {
        setShowFallBack(progress.playedSeconds === 0);
        getShowCallback(progress.playedSeconds === 0)
    }

    const getScrollValue = () => {
        var y = window.scrollY;
        setPlaying(y < 400) 
    }
    
    useEffect(() => {
        document.addEventListener("scroll", getScrollValue);
        return function cleanup() {
            document.removeEventListener("scroll", getScrollValue);
        }
    },[])

    const fallback = () => {
        return (
            <div style={{backgroundImage: `url(${baseBackfropUrl+backdrop})`}} className={'backdrop-fallback'}></div>
        )
    }
    return (
        <>
            { (videoKey && ReactPlayer.canPlay(videoKey)) &&
                <div className={'head-video-container'}>
                    {showFallBack && fallback()}
                    <ReactPlayer
                        onDuration={handleOnDuration}
                        onProgress={handleOnProgress}
                        onError={handleOnError}
                        playing
                        volume={playing ? 1 : 0}
                        className={className}
                        url={videosList ? videosList : baseUrl+videoKey}
                    />
                </div>
            }
        </>
    )

}

export default VideoPlayer