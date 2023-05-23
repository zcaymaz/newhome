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

  function isoDateToCustomFormat(isoDate) {
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  }
  

  const getAdDetails = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/api/project/${projectId}`);
      console.log(res.data)
      const ad = res.data;
      setTitle(ad.title);
      setLocation(ad.location);
      setStartDate(isoDateToCustomFormat(ad.startDate));
      setFinishDate(isoDateToCustomFormat(ad.finishDate));
      setDesc(ad.description);
      setImages(ad.images);
      setHousingNumber(ad.housingnumber);
      setFeatures(ad.features);
    } catch (error) {
      console.log(error.response.data.msg);
    }
  };

  const createProject = async (e) => {
    e.preventDefault();
    try {
      if (onEdit) {
        const res = await axios.put(
          `http://localhost:3001/api/project/${projectId}`,
          {
            name: localStorage.getItem('name'),
            useremail: localStorage.getItem('email'),
            title: title,
            location: location,
            startDate: startDate,
            finishDate: finishDate,
            description: description,
            images: images,
            housingnumber: housingnumber,
            features: features,
          }
        );
        console.log(res.data.msg);
      } else {
        const res = await axios.post('http://localhost:3001/api/project/', {
          name: localStorage.getItem('name'),
          useremail: localStorage.getItem('email'),
          title: title,
          location: location,
          startDate: startDate,
          finishDate: finishDate,
          description: description,
          images: images,
          housingnumber: housingnumber,
          features: features,
        });
        console.log(res.data.msg);
      }
      setOnEdit(false);
      setTitle('');
      setLocation([]);
      setStartDate('');
      setFinishDate('');
      setDesc('');
      setImages([]);
      setHousingNumber('');
      setFeatures([]);
      window.location.href = 'http://localhost:3000/ProjectAdd';
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const handleProvinceChange = (event, value) => {
    setSelectedProvince(value);
    setLocation((prevState) => ({
      ...prevState,
      province: value ? value.name : '',
    }));
  };

  const handleDistrictChange = (event, value) => {
    setSelectedDistrict(value);
    setLocation((prevState) => ({
      ...prevState,
      district: value ? value.name : '',
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
          <form onSubmit={createProject}>
            <ImageUploader value={images} pickImages={setImages} />
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