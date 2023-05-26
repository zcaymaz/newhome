import React, { useState } from 'react';
import axios from 'axios';

const ImageForm = ({ onUpload, onSubmit }) => {
  const [selectedImages, setSelectedImages] = useState([]);

  const handleImageChange = (e) => {
    setSelectedImages(Array.from(e.target.files));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    selectedImages.forEach((image) => {
      formData.append('images', image);
    });

    try {
      const res = await axios.post('http://localhost:3001/api/images/upload', formData);
      setSelectedImages([]);
      onUpload(res.data.images); // Yüklenen resimleri üst bileşene iletmek için onUpload fonksiyonunu çağırıyoruz
      onSubmit(); // Submit işlemini üst bileşene iletmek için onSubmit fonksiyonunu çağırıyoruz
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <input type="file" multiple onChange={handleImageChange} />
    </div>
  );
};

export default ImageForm;
