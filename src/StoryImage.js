import React from 'react';
import PropTypes from 'prop-types';

// Functional Component to display an image
const StoryImage = ({ src, alt }) => (
  <img src={src} alt={alt} />
);

// Prop-Types for the component
StoryImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string
};

StoryImage.defaultProps = {
  alt: ''
};

export default StoryImage;
