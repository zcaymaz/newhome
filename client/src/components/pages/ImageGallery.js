import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ImageGallery = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/images');
      setImages(response.data.images);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {images.map((image) => (
        <div key={image._id}>
          {image.url.map((url) => (
            <img src={url} alt="Gallery Image" key={url}/>
          ))}
          <h3>{image.name}</h3>
          <p>{image.description}</p>
        </div>
      ))}
    </div>
  );
};

export default ImageGallery;

