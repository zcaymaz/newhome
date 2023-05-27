/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Grid, Stack, Typography, Button, Container } from '@mui/material';
import { FormInput, MultilineFormInput } from '../common/Inputs';
import AutoComp from '../common/AutoComp';
import axios from 'axios';
import ImageUploader from '../common/ImageUpload';
import CityComboBox from '../common/Combobox';

const ProjectAdd = ({ match }) => {
  const projectId = match.params.id;
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);

  const [title, setTitle] = useState('');
  const [location, setLocation] = useState({ province: '', district: '' });
  const [startDate, setStartDate] = useState('');
  const [finishDate, setFinishDate] = useState('');
  const [description, setDesc] = useState('');
  const [images, setImages] = useState([]);
  const [housingnumber, setHousingNumber] = useState('');
  const [features, setFeatures] = useState([]);
  const [onEdit, setOnEdit] = useState(false);

  useEffect(() => {
    if (projectId) {
      setOnEdit(true);
      getAdDetails();
    } else {
      setOnEdit(false);
      setTitle('');
      setLocation({ province: '', district: '' });
      setStartDate('');
      setFinishDate('');
      setDesc('');
      setImages([]);
      setHousingNumber('');
      setFeatures([]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  const handleImageChange = (images) => {
    const convertedImages = Array.from(images).map((image) => URL.createObjectURL(image));
    setSelectedImages(convertedImages);
  };
  
  const getAdDetails = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/api/project/${projectId}`);
      console.log(res.data)
      const ad = res.data;
      setTitle(ad.title);
      setSelectedProvince(ad.location[0].province);
      setSelectedDistrict(ad.location[0].district);
      setStartDate(isoDateToCustomFormat(ad.startDate));
      setFinishDate(isoDateToCustomFormat(ad.finishDate));
      setDesc(ad.description);
      setImages(ad.images);
      setHousingNumber(ad.housingnumber);
      setFeatures(ad.features);
      setSelectedImages(ad.images); // Güncelleme: Sunucudan gelen resimleri selectedImages state'ine ekliyoruz
    } catch (error) {
      console.log(error.response.data.msg);
    }
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
    formData.append('name', localStorage.getItem('name'));
    formData.append('useremail', localStorage.getItem('email'));
    formData.append('title', title);
    formData.append('description', description);
    formData.append('location[province]', selectedProvince);
    formData.append('location[district]', selectedDistrict);
    formData.append('housingnumber', housingnumber);
    formData.append('startDate', startDate);
    formData.append('finishDate', finishDate);
    features.forEach((feature, index) => {
      formData.append(`features[${index}][title]`, feature.title);
    });
    
    if (selectedImages.length > 0) {
      formData.append('images', selectedImages[0]);
    }
    try {
      if (onEdit) {
        const res = await axios.put(`http://localhost:3001/api/project/${projectId}`, formData);
        console.log(res.data.msg);
      } else {
        const res = await axios.post('http://localhost:3001/api/project', formData);
        console.log(res.data.msg);
      }
      setOnEdit(false);
      setTitle('');
      setLocation([]);
      setStartDate('');
      setFinishDate('');
      setDesc('');
      setHousingNumber('');
      setFeatures([]);
      setSelectedImages([]);
      window.location.href = 'http://localhost:3000/projectadd';
    } catch (err) {
      alert(err.response.data.msg);
    }
  };



  function isoDateToCustomFormat(isoDate) {
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  }
  
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
        <Grid item xs="12">
          {onEdit ? (
            <Typography padding={2} className="ProjectAddTypography">
              <center>
                <h4>Proje Güncelle</h4>
              </center>
              <hr />
            </Typography>
          ) : (
            <Typography padding={2} className="ProjectAddTypography">
              <center>
                <h4>Proje Ekle</h4>
              </center>
              <hr />
            </Typography>
          )}
          <form onSubmit={handleSubmit}>
          <ImageUploader value={selectedImages} onChange={handleImageChange}/>
            <Stack direction="row" spacing={3} padding={1}>
              <FormInput
                label="Başlık"
                name="title"
                id="title"
                value={title}
                required
                onChange={(e) => setTitle(e.target.value)}
              />
              <FormInput
                label="Daire Sayısı"
                type="number"
                name="housingnumber"
                id="housingnumber"
                value={housingnumber}
                required
                onChange={(e) => {
                  if (e.target.value.length <= 5) {
                    setHousingNumber(e.target.value);
                  }
                }}
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
            <Grid container spacing={3} padding={1}>
              <Grid item xs={6} spacing={2}>
                <Typography>Proje Başlangıç Tarihi:</Typography>
                <FormInput
                  placeholder="Başlangıç Tarihi"
                  type="date"
                  name="startDate"
                  id="startDate"
                  value={startDate}
                  required
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <Typography>Proje Bitiş Tarihi:</Typography>
                <FormInput
                  placeholder="Teslim Tarihi"
                  type="date"
                  name="finishDate"
                  id="finishDate"
                  value={finishDate}
                  required
                  onChange={(e) => setFinishDate(e.target.value)}
                />
              </Grid>
            </Grid>
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

export default ProjectAdd;
