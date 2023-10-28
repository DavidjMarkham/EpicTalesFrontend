import React from 'react';
import PropTypes from 'prop-types';

const StoryImage = ({ src, alt, children, setImageLoaded, imageLoaded }) => (
  <div className="storyImage">
    <img 
        src={src} 
        alt={alt} 
        onLoad={() => setImageLoaded(true)} 
        className={imageLoaded ? 'fade-in' : ''} 
    />
    <div className="storyTextOverlay">{children}</div>
  </div>
);

StoryImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  children: PropTypes.node,
  setImageLoaded: PropTypes.func.isRequired,
  imageLoaded: PropTypes.bool.isRequired
};

StoryImage.defaultProps = {
  alt: '',
  children: null
};

export default StoryImage;