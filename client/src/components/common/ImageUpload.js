import React, { useState, useRef, useEffect } from "react";

const ImageUploader = ({ value, onChange }) => {
  const [images, setImages] = useState(value || []);
  const fileInputRef = useRef();

  useEffect(() => {
    setImages(value)
  }, [value])

  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    uploadImages(files);
  };

  const handleImageChange = (e) => {
    const newImages = Array.from(e.target.files);
    setImages([...images, ...newImages]);
    if (onChange) onChange([...images, ...newImages]);
  };
  
  const uploadImages = (files) => {
    const newImages = Array.from(files);
    setImages([...images, ...newImages]);
    if (onChange) onChange([...images, ...newImages]);
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
      <input type="file" id="file-input" multiple onChange={handleImageChange} ref={fileInputRef} style={{ display: "none" }} />
      <div className="preview">
        {images.map((image, index) => (
          <div className="image-container" key={index}>
            <button className="remove-image" onClick={() => handleRemoveImage(index)}>X</button>
            <center>
              <img className="imageuploadphoto" src={typeof image === 'string' ? image : URL.createObjectURL(image)} alt='flat' />
            </center>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUploader;
