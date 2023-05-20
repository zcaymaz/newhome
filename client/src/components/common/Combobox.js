import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';
import { Stack } from '@mui/material';

export default function CityComboBox({ onProvinceChange, onDistrictChange }) {
  const [provinces, setProvinces] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState(null);

  useEffect(() => {
    fetchProvinces();
  }, []);

  const fetchProvinces = async () => {
    try {
      const response = await axios.get('https://turkiyeapi.cyclic.app/api/v1/provinces/');
      setProvinces(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchDistricts = async (selectedProvinceId) => {
    try {
      const response = await axios.get(`https://turkiyeapi.cyclic.app/api/v1/provinces/${selectedProvinceId}`);
      setDistricts(response.data.data.districts);
    } catch (error) {
      console.error(error);
    }
  };

  const handleProvinceChange = (event, value) => {
    setSelectedProvince(value);
    setSelectedDistrict(null);
    if (value) {
      fetchDistricts(value.id);
    }
    onProvinceChange(event, value); 
  };

  const handleDistrictChange = (event, value) => {
    setSelectedDistrict(value);
    onDistrictChange(event, value); 
  };

  return (
    <Stack direction="row" spacing={3} width="100%">
      <Autocomplete
        size='medium'
        disablePortal
        id="combo-box-province"
        sx={{ width: '100%', bgcolor: '#FEFCFD' }}
        renderInput={(params) => <TextField {...params} label="İl" />}
        options={provinces}
        getOptionLabel={(option) => option.name}
        onChange={handleProvinceChange}
        value={selectedProvince}
        isOptionEqualToValue={(option, value) => option.id === value?.id}
      />
      {selectedProvince && (
        <Autocomplete
          size='medium'
          disablePortal
          id="combo-box-district"
          sx={{ width: '100%', bgcolor: '#FEFCFD' }}
          renderInput={(params) => <TextField {...params} label="İlçe" />}
          options={districts}
          getOptionLabel={(option) => option.name}
          onChange={handleDistrictChange}
          value={selectedDistrict}
          isOptionEqualToValue={(option, value) => option.id === value?.id} 
        />
      )}
    </Stack>
  );
}
