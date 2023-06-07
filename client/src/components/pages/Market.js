/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Footer from "../Footer";
import FlatItem from "../FlatItem";
import { Stack, Autocomplete, TextField, Button } from "@mui/material";
import axios from "axios";
import {
  SelectResidence,
  SelectRoomCount,
  SelectSaleType,
} from "../common/SelectComp";

const Market = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [provinces, setProvinces] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [flat, setFlat] = useState([]);
  const [filteredFlats, setFilteredFlats] = useState(null);
  const [type, setType] = useState("");
  const [roomnumber, setRoomNumber] = useState("");
  const [saletype, setSaleType] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/task/")
      .then((res) => {
        const reversedFlat = res.data.reverse();
        setFlat(reversedFlat);
        setFilteredFlats(null);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    filterFlatByLocation();
  }, [
    selectedDistrict,
    selectedProvince,
    searchTerm,
    type,
    roomnumber,
    saletype,
    minPrice,
  ]);

  const filterFlatByLocation = () => {
    let filteredData = flat.filter((fl) => {
      if (selectedProvince && selectedDistrict) {
        return (
          fl?.location?.[0]?.province === selectedProvince.name &&
          fl?.location?.[0]?.district === selectedDistrict.name
        );
      }

      if (selectedProvince) {
        return fl?.location?.[0]?.province === selectedProvince.name;
      }
      return true;
    });

    if (searchTerm) {
      filteredData = filteredData.filter((fl) =>
        fl.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (type) {
      filteredData = filteredData.filter((fl) => fl.type === type);
    }

    if (roomnumber) {
      filteredData = filteredData.filter((fl) => fl.roomnumber === roomnumber);
    }

    if (saletype) {
      filteredData = filteredData.filter((fl) => fl.saletype === saletype);
    }

    if (minPrice && maxPrice) {
      filteredData = filteredData.filter(
        (fl) => fl.price >= parseInt(minPrice) && fl.price <= parseInt(maxPrice)
      );
    } else if (minPrice) {
      filteredData = filteredData.filter(
        (fl) => fl.price >= parseInt(minPrice)
      );
    } else if (maxPrice) {
      filteredData = filteredData.filter(
        (fl) => fl.price <= parseInt(maxPrice)
      );
    }
    setFilteredFlats(filteredData);
  };

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

    filterFlatByLocation();
  };

  const handleDistrictChange = (event, value) => {
    setSelectedDistrict(value);

    filterFlatByLocation();
  };

  useEffect(() => {
    fetchProvinces();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleMinPrice = (e) => {
    setMinPrice(e.target.value);
  };

  const handleMaxPrice = (e) => {
    setMaxPrice(e.target.value);
  };

  const handleReset = () => {
    setSearchTerm("");
    setSelectedProvince(null);
    setSelectedDistrict(null);
    setType("");
    setRoomNumber("");
    setSaleType("");
    setMinPrice("");
    setMaxPrice("");
  };

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
                </div>
              </div>
              <div className="col-lg-4 mt-3">
                <div className="search-area2">
                  <SelectResidence
                    name="type"
                    id="type"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-lg-4 mt-3">
                <div className="search-area2">
                  <SelectRoomCount
                    name="roomnumber"
                    id="roomnumber"
                    value={roomnumber}
                    onChange={(e) => setRoomNumber(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-lg-4 mt-3">
                <div className="search-area2">
                  <SelectSaleType
                    name="saletype"
                    id="saletype"
                    value={saletype}
                    onChange={(e) => setSaleType(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-lg-3 mt-3">
                <div className="search-area2">
                  <input
                    type="number"
                    className="inp-search"
                    value={minPrice}
                    onChange={handleMinPrice}
                    placeholder="Min Tutar"
                  />
                </div>
              </div>
              <div className="col-lg-3 mt-3">
                <div className="search-area2">
                  <input
                    type="number"
                    className="inp-search"
                    value={maxPrice}
                    onChange={handleMaxPrice}
                    placeholder="Max Tutar"
                  />
                </div>
              </div>
              <div className="col-lg-3 mt-4">
                <Button
                  sx={{
                    color: "#ffff",
                    bgcolor: "#0f0f0f",
                    height: "40px",
                    padding: "1rem",
                    "&:hover": { bgcolor: "primary.dark" },
                  }}
                  onClick={handleReset}
                >
                  Sıfırla
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section className="section-all-re">
          <div className="container">
            <div className="row">
              {!filteredFlats
                ? flat.map((flat) => (
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
                  ))
                : filteredFlats.map((flat) => (
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

  // useEffect(() => {
  //   filterFlatByLocation();
  // }, [selectedDistrict, selectedProvinces, searchTerm, type, roomnumber, saletype]);
  

  // const filterFlatByLocation = () => {
  //   let filteredData = flat.filter((fl) => {
  //     if (selectedProvinces.length > 0 && selectedDistrict) {
  //       const provinceMatch = selectedProvinces.some(province =>
  //         province.name === fl?.location?.[0]?.province
  //       );
  //       return provinceMatch && fl?.location?.[0]?.district === selectedDistrict.name;
  //     }
  
  //     if (selectedProvinces.length > 0) {
  //       const provinceMatch = selectedProvinces.some(province =>
  //         province.name === fl?.location?.[0]?.province
  //       );
  //       return provinceMatch;
  //     }
  //     return true;
  //   });
  
  //   if (searchTerm) {
  //     filteredData = filteredData.filter((fl) =>
  //       fl.title.toLowerCase().includes(searchTerm.toLowerCase())
  //     );
  //   }
  
  //   if (type) {
  //     filteredData = filteredData.filter((fl) => fl.type === type);
  //   }
  
  //   if (roomnumber) {
  //     filteredData = filteredData.filter((fl) => fl.roomnumber === roomnumber);
  //   }
  
  //   if (saletype) {
  //     filteredData = filteredData.filter((fl) => fl.saletype === saletype);
  //   }
  
  //   setFilteredFlats(filteredData);
  // };
  
  // const handleProvinceChange = (event, values) => {
  //   setSelectedProvinces(values);
  //   setSelectedDistrict(null);
  //   if (values && values.length > 0) {
  //     const selectedProvinceIds = values.map(value => value.id);
  //     fetchDistricts(selectedProvinceIds);
  //   }

  //   filterFlatByLocation();
  // };

  // const handleDistrictChange = (event, value) => {
  //   setSelectedDistrict(value);

  //   filterFlatByLocation();
  // };

  // useEffect(() => {
  //   fetchProvinces();
  // }, []);

  // const handleSearch = (e) => {
  //   setSearchTerm(e.target.value);
  // };

  // const handleReset = () => {
  //   setSearchTerm("");
  //   setSelectedProvinces([]);
  //   setSelectedDistrict(null);
  //   setType("");
  //   setRoomNumber("");
  //   setSaleType("");
  // };
  //               <Stack direction="row" spacing={3} width="100%">
  //                 <Autocomplete
  //                   size="medium"
  //                   disablePortal
  //                   multiple
  //                   id="combo-box-province"
  //                   sx={{ width: "100%", bgcolor: "#FEFCFD" }}
  //                   renderInput={(params) => (
  //                     <TextField {...params} label="İl" />
  //                   )}
  //                   options={provinces}
  //                   getOptionLabel={(option) => option.name}
  //                   onChange={handleProvinceChange}
  //                   value={selectedProvinces}
  //                   isOptionEqualToValue={(option, value) =>
  //                     option.id === value?.id
  //                   }
  //                 />
  //                 {selectedProvinces.length > 0 && (
  //                   <Autocomplete
  //                     size="medium"
  //                     disablePortal
  //                     id="combo-box-district"
  //                     sx={{ width: "100%", bgcolor: "#FEFCFD" }}
  //                     renderInput={(params) => (
  //                       <TextField {...params} label="İlçe" />
  //                     )}
  //                     options={districts}
  //                     getOptionLabel={(option) => option.name}
  //                     onChange={handleDistrictChange}
  //                     value={selectedDistrict}
  //                     isOptionEqualToValue={(option, value) =>
  //                       option.id === value?.id
  //                     }
  //                   />
  //                 )}
  //               </Stack>
