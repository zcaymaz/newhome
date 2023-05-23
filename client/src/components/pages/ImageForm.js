import React, { useState } from 'react';
import axios from 'axios';

const ImageForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedImages, setSelectedImages] = useState([]);

  const handleImageChange = (e) => {
    setSelectedImages(Array.from(e.target.files));
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    selectedImages.forEach((image) => {
      formData.append('images', image);
    });
    formData.append('name', name);
    formData.append('description', description);

    try {
      await axios.post('http://localhost:3001/api/images/upload', formData);
      setSelectedImages([]);
      setName('');
      setDescription('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" multiple onChange={handleImageChange} />
      <input type="text" value={name} onChange={handleNameChange} placeholder="Name" />
      <input type="text" value={description} onChange={handleDescriptionChange} placeholder="Description" />
      <button type="submit">Upload</button>
    </form>
  );
};

export default ImageForm;
