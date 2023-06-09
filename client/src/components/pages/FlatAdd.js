/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Grid, Stack, Typography, Button, Container } from '@mui/material';
import axios from 'axios';
import { FormInput, MultilineFormInput } from '../common/Inputs';
import { SelectResidence, SelectRoomCount, SelectSaleType } from '../common/SelectComp';
import AutoComp from '../common/AutoComp';
import CityComboBox from '../common/Combobox';
import ImageUploader from '../common/ImageUpload';

const FlatAdd = ({ match }) => {
  const flatId = match.params.id;
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);

  const [title, setTitle] = useState('');
  const [location, setLocation] = useState({ province: '', district: '' });
  const [price, setPrice] = useState('');
  const [description, setDesc] = useState('');
  const [type, setType] = useState('');
  const [images, setImages] = useState([]);
  const [roomnumber, setRoomNumber] = useState('');
  const [saletype, setSaleType] = useState('');
  const [squaremeters, setSquareMeters] = useState('');
  const [features, setFeatures] = useState([]);
  const [onEdit, setOnEdit] = useState(false);

  useEffect(() => {
    if (flatId) {
      setOnEdit(true);
      getAdDetails();
    } else {
      setOnEdit(false);
      setTitle('');
      setLocation({ province: '', district: '' });
      setPrice('');
      setDesc('');
      setType('');
      setImages([]);
      setRoomNumber('');
      setSaleType('');
      setSquareMeters('');
      setFeatures([]);
    }
  }, [flatId]);

  const getAdDetails = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/api/task/${flatId}`);
      const ad = res.data;
      setTitle(ad.title);
      setSelectedProvince(ad.location[0].province);
      setSelectedDistrict(ad.location[0].district);
      setPrice(ad.price);
      setDesc(ad.description);
      setType(ad.type);
      setImages(ad.images);
      setRoomNumber(ad.roomnumber);
      setSaleType(ad.saletype);
      setSquareMeters(ad.squaremeters);
      setFeatures(ad.features);
      setSelectedImages(ad.images); // Güncelleme: Sunucudan gelen resimleri selectedImages state'ine ekliyoruz
    } catch (error) {
      console.log(error.response.data.msg);
    }
  };
  const handleImageChange = (images) => {
    const convertedImages = Array.from(images).map((image) => URL.createObjectURL(image));
    setSelectedImages(convertedImages);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    selectedImages.forEach((image) => {
      formData.append('images', image);
    });
    await Promise.all(
      selectedImages.map(async (imageUrl, index) => {
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        formData.append('images', blob, `image${index}`);
      })
    );
    formData.append('title', title);
    formData.append('price', price);
    formData.append('name', localStorage.getItem('name'));
    formData.append('useremail', localStorage.getItem('email'));
    formData.append('description', description);
    formData.append('location[province]', selectedProvince);
    formData.append('location[district]', selectedDistrict);
    formData.append('type', type);
    formData.append('roomnumber', roomnumber);
    formData.append('saletype', saletype);
    formData.append('squaremeters', squaremeters);
    features.forEach((feature, index) => {
      formData.append(`features[${index}][title]`, feature.title);
    });
    
    if (selectedImages.length > 0) {
      formData.append('images', selectedImages[0]);
    }
    try {
      if (onEdit) {
        const res = await axios.put(`http://localhost:3001/api/task/${flatId}`, formData);
        console.log(res.data.msg);
      } else {
        const res = await axios.post('http://localhost:3001/api/task', formData);
        console.log(res.data.msg);
      }
      setOnEdit(false);
      setTitle('');
      setLocation({});
      setPrice('');
      setDesc('');
      setType('');
      setRoomNumber('');
      setSaleType('');
      setSquareMeters('');
      setFeatures([]);
      setSelectedImages([]);
      window.location.href = 'http://localhost:3000/flatadd';
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const handleProvinceChange = (event, value) => {
    setSelectedProvince(value ? value.name : location.province);
    setLocation((prevState) => ({
      ...prevState,
      province: value ? value.name : location.province,
    }));
  };
  
  const handleDistrictChange = (event, value) => {
    setSelectedDistrict(value ? value.name : location.district);
    setLocation((prevState) => ({
      ...prevState,
      district: value ? value.name : location.district,
    }));
  };
  
  return (
    <Container maxWidth="lg" className="flattAddContainer">
      <Grid container padding={2} direction="row" sx={{ height: '100vh' }}>
        <Grid item xs={12}>
          {onEdit ? (
            <Typography padding={2} className="flatAddTypography">
              <center>
                <h4>İlan Güncelle</h4>
              </center>
              <hr />
            </Typography>
          ) : (
            <Typography padding={2} className="flatAddTypography">
              <center>
                <h4>İlan Ekle</h4>
              </center>
              <hr />
            </Typography>
          )}
          <form onSubmit={handleSubmit}>
          <ImageUploader value={selectedImages} onChange={handleImageChange}/>
            <Stack direction="row" spacing={3} padding={1}>
              <FormInput
                size="medium"
                label="Başlık"
                name="title"
                id="title"
                value={title}
                required
                onChange={(e) => setTitle(e.target.value)}
              />
              <FormInput
                size="medium"
                label="Fiyat"
                type="number"
                name="price"
                id="price"
                value={price}
                required
                onChange={(e) => setPrice(e.target.value)}
              />
            </Stack>
            <Stack direction="row" spacing={3} padding={1}>
              <CityComboBox
                onProvinceChange={handleProvinceChange}
                onDistrictChange={handleDistrictChange}
                provinceValue={selectedProvince}
                districtValue={selectedDistrict}
              />
            </Stack>
            <Stack direction="row" spacing={3} padding={1}>
              <MultilineFormInput
                label="Açıklama"
                name="description"
                id="description"
                value={description}
                required
                onChange={(e) => setDesc(e.target.value)}
              />
            </Stack>
            <Stack direction="row" spacing={3} padding={1}>
              <SelectResidence
                name="type"
                id="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
              />
              <SelectRoomCount
                name="roomnumber"
                id="roomnumber"
                value={roomnumber}
                onChange={(e) => setRoomNumber(e.target.value)}
              />
              <SelectSaleType
                name="saletype"
                id="saletype"
                value={saletype}
                onChange={(e) => setSaleType(e.target.value)}
              />
              <FormInput
                size="medium"
                label="Metrekare"
                type="number"
                name="squaremeters"
                id="squaremeters"
                value={squaremeters}
                required
                onChange={(e) => setSquareMeters(e.target.value)}
              />
            </Stack>
            <Stack direction="row" spacing={3} padding={1}>
              <AutoComp
                value={features}
                name="features"
                id="features"
                onChange={(event, newValue) => {
                  setFeatures(newValue);
                }}
              />
            </Stack>
            <center>
              <Button className="FlatAddButton" type="submit">
                Onayla
              </Button>
            </center>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};

export default FlatAdd;
  // const createTask = async (e) => {
  //   e.preventDefault();

  //   const formData = new FormData();
  //   selectedImages.forEach((image) => {
  //     formData.append('images', image);
  //   });
  //   formData.append('name', localStorage.getItem('name'));
  //   formData.append('useremail', localStorage.getItem('email'));
  //   formData.append('title', title);
  //   formData.append('location', location);
  //   formData.append('price', price);
  //   formData.append('description', description);
  //   formData.append('type', type);
  //   formData.append('roomnumber', roomnumber);
  //   formData.append('saletype', saletype);
  //   formData.append('squaremeters', squaremeters);
  //   formData.append('features', JSON.stringify(features));

  //   try {
  //     if (onEdit) {
  //       const res = await axios.put(`http://localhost:3001/api/task/${flatId}`, formData);
  //       console.log(res.data.msg);
  //     } else {
  //       const res = await axios.post('http://localhost:3001/api/task', formData);
  //       console.log(res.data.msg);
  //     }
  //     setOnEdit(false);
  //     setTitle('');
  //     setLocation({});
  //     setPrice('');
  //     setDesc('');
  //     setType('');
  //     setRoomNumber('');
  //     setSaleType('');
  //     setSquareMeters('');
  //     setFeatures([]);
  //     setSelectedImages([]);
  //     window.location.href = 'http://localhost:3000/flatadd';
  //   } catch (err) {
  //     alert(err.response.data.msg);
  //   }
  // };