/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Footer from "../Footer";
import Title from "../common/Title";
import FlatItem from "../FlatItem";
import { Stack, Autocomplete, TextField } from "@mui/material";
import axios from "axios";

const Market = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [provinces, setProvinces] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState(null);

  const [flat, setFlat] = useState([]);
  const [flatLocation, setFlatLocation] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/task/")
      .then((res) => {
        const reversedFlat = res.data.reverse();
        setFlat(reversedFlat);
        const flatLocations = reversedFlat.map((flat) => flat.location);
        setFlatLocation(flatLocations);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const filterFlatByLocation = (flat) => {
    if (selectedProvince && selectedDistrict) {
      return (
        flat.location.province === selectedProvince.name &&
        flat.location.district === selectedDistrict.name
      );
    } else if (selectedProvince) {
      return flat.location.province === selectedProvince.name;
    }
    return true;
  };

  let filteredFlat = flat.filter(filterFlatByLocation);

  if (searchTerm) {
    filteredFlat = filteredFlat.filter((flatItem) =>
      flatItem.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  const fetchProvinces = async () => {
    try {
      const response = await axios.get(
        "https://turkiyeapi.cyclic.app/api/v1/provinces/"
      );
      setProvinces(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchDistricts = async (selectedProvinceId) => {
    try {
      const response = await axios.get(
        `https://turkiyeapi.cyclic.app/api/v1/provinces/${selectedProvinceId}`
      );
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
  };

  const handleDistrictChange = (event, value) => {
    setSelectedDistrict(value);
  };

  useEffect(() => {
    fetchProvinces();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  console.log(selectedProvince.name)
  return (
    <>
      <section className="about">
        <div className="page-top">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <h1 className="page-title">İlanlar</h1>
              </div>
            </div>
          </div>
        </div>
        <section className="section-market">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <Stack direction="row" spacing={3} width="100%">
                  <Autocomplete
                    size="medium"
                    disablePortal
                    id="combo-box-province"
                    sx={{ width: "100%", bgcolor: "#FEFCFD" }}
                    renderInput={(params) => (
                      <TextField {...params} label="İl" />
                    )}
                    options={provinces}
                    getOptionLabel={(option) => option.name}
                    onChange={handleProvinceChange}
                    value={selectedProvince}
                    isOptionEqualToValue={(option, value) =>
                      option.id === value?.id
                    }
                  />
                  {selectedProvince && (
                    <Autocomplete
                      size="medium"
                      disablePortal
                      id="combo-box-district"
                      sx={{ width: "100%", bgcolor: "#FEFCFD" }}
                      renderInput={(params) => (
                        <TextField {...params} label="İlçe" />
                      )}
                      options={districts}
                      getOptionLabel={(option) => option.name}
                      onChange={handleDistrictChange}
                      value={selectedDistrict}
                      isOptionEqualToValue={(option, value) =>
                        option.id === value?.id
                      }
                    />
                  )}
                </Stack>
              </div>
              <div className="col-lg-6">
                <div className="search-area2">
                  <input
                    type="text"
                    className="inp-search"
                    value={searchTerm}
                    onChange={handleSearch}
                    placeholder="İlan Ara"
                  />
                  <button className="btn-search2">
                    <i
                      className="fas fa-search"
                      style={{ marginRight: "8px" }}
                    />
                    Ara
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="section-all-re">
          <div className="container">
            <Title title={" "} />
            <div className="row">
              {filteredFlat.map((flat) => (
                <FlatItem
                  key={flat._id}
                  flatId={flat._id}
                  src={
                    flat.images && flat.images.length > 0
                      ? flat.images[0]
                      : flat.image
                  }
                  name={flat.name}
                  title={flat.title}
                  price={flat.price}
                  type={flat.type}
                  roomnumber={flat.roomnumber}
                  squaremeters={flat.squaremeters}
                />
              ))}
            </div>
          </div>
        </section>
      </section>
      <Footer />
    </>
  );
};

export default Market;
