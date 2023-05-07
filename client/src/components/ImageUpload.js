import React, { useState, useRef } from "react";

const ImageUploader = ({ value = [], onChange, pickImages }) => {
  const [images, setImages] = useState(value || []);
  const fileInputRef = useRef();

  const handleDrop = (e) => {
    e.preventDefault();
    const newImages = [];
    for (let i = 0; i < e.dataTransfer.files.length; i++) {
      const file = e.dataTransfer.files[i];
      const reader = new FileReader();
      reader.onload = (event) => {
        newImages.push(event.target.result);
        if (newImages.length === e.dataTransfer.files.length) {
          setImages([...images, ...newImages]);
          if (onChange) onChange([...images, ...newImages]);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileSelect = (e) => {
    const newImages = [];
    for (let i = 0; i < e.target.files.length; i++) {
      const file = e.target.files[i];
      const reader = new FileReader();
      reader.onload = (event) => {
        newImages.push(event.target.result);
        if (newImages.length === e.target.files.length) {
          setImages([...images, ...newImages]);
          if (onChange) onChange([...images, ...newImages]);
        }
      };
      reader.readAsDataURL(file);
    }
    pickImages(newImages);
  };

  const handleRemoveImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
    if (onChange) onChange(newImages);
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="image-uploader" onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
      <div className="drop-message" onClick={handleClick}>Resim yükle</div>
      <input type="file" id="file-input" multiple onChange={handleFileSelect} ref={fileInputRef} style={{ display: "none" }} />
      <div className="preview">
        {images.map((image, index) => (
          <div className="image-container" key={index}>
            <button className="remove-image" onClick={() => handleRemoveImage(index)}>X</button>
            <img src={image} alt={`Image ${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUploader;
