import React from 'react';
import loadingGif from '../assets/gif/loading.gif'

const Loading = () => {
    const style = {
        display: 'block',
        margin: '10px auto',
        width: '50px'
    }
    return (
        <img src={loadingGif} style={style} alt="loading..." />
    );
}

export default Loading;