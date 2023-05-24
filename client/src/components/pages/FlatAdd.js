/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Grid, Stack, Typography, Button, Container } from '@mui/material';
import axios from 'axios';
import { FormInput, MultilineFormInput } from '../common/Inputs';
import { SelectResidence, SelectRoomCount, SelectSaleType } from '../common/SelectComp';
import AutoComp from '../common/AutoComp';
import ImageUploader from '../common/ImageUpload';
import CityComboBox from '../common/Combobox';

const FlatAdd = ({ match }) => {
  const flatId = match.params.id;
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);

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
      setLocation(ad.location);
      setPrice(ad.price);
      setDesc(ad.description);
      setType(ad.type);
      setImages(ad.images);
      setRoomNumber(ad.roomnumber);
      setSaleType(ad.saletype);
      setSquareMeters(ad.squaremeters);
      setFeatures(ad.features);
    } catch (error) {
      console.log(error.response.data.msg);
    }
  };
  

  const createTask = async (e) => {
    e.preventDefault();
    try {
      if (onEdit) {
        const res = await axios.put(
          `http://localhost:3001/api/task/${flatId}`,
          {
            name: localStorage.getItem('name'),
            useremail: localStorage.getItem('email'),
            title: title,
            location: location,
            price: price,
            description: description,
            type: type,
            images: images,
            roomnumber: roomnumber,
            saletype: saletype,
            squaremeters: squaremeters,
            features: features,
          }
        );
        console.log(res.data.msg);
      } else {
        const res = await axios.post(
          'http://localhost:3001/api/task',
          {
            name: localStorage.getItem('name'),
            useremail: localStorage.getItem('email'),
            title: title,
            location: location,
            price: price,
            description: description,
            type: type,
            images: images,
            roomnumber: roomnumber,
            saletype: saletype,
            squaremeters: squaremeters,
            features: features,
          },
          {
            location: `${location.province}, ${location.district}`,
          }
        );
        console.log(res.data.msg);
      }
      setOnEdit(false);
      setTitle('');
      setLocation({});
      setPrice('');
      setDesc('');
      setType('');
      setImages([]);
      setRoomNumber('');
      setSaleType('');
      setSquareMeters('');
      setFeatures([]);
      window.location.href = 'http://localhost:3000/flatadd';
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
          <form onSubmit={createTask}>
            <ImageUploader value={images} pickImages={setImages} />
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
