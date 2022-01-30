import React, { useState, useEffect } from "react";
import ReactPlayer from 'react-player'

const baseUrl = 'https://www.youtube.com/watch?v=';

function VideoPlayer(props) {

    const [playing, setPlaying] = useState(true);

    const {
        videoKey,
        videosList,
        className,
        getDuration,
    } = props;

    const handleOnDuration = (duration) => {
        getDuration(duration)
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

    return (
        <ReactPlayer
            onDuration={handleOnDuration}
            playing={playing}
            className={className}
            url={videosList ? videosList : baseUrl+videoKey}
        />
    )

}

export default VideoPlayer