import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types'

const VideoPlayer = (props) => {
    const {src ,type ,height,className} = props
    const [videoWidth, setvideoWidth] = useState(201)

useEffect(() => {
window.innerWidth  <= 1024 && setvideoWidth(300)
}, []);

return (
<video className={className} width={videoWidth} height={height} controls>
<source src={src} type={type} />
</video>
);
};

export default VideoPlayer;

VideoPlayer.propTypes ={
    src: PropTypes.string,
    type: PropTypes.string,
    height: PropTypes.number,
    className: PropTypes.string,
  }