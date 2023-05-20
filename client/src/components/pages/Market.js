import React, { useState } from 'react';
import FlatList from '../section/FlatList';
import Combobox from '../common/Combobox';
import Footer from '../Footer';

const Market = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleProvinceChange = (event, value) => {
    setSelectedProvince(value);
    setSelectedDistrict(null);
  };

  const handleDistrictChange = (event, value) => {
    setSelectedDistrict(value);
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
                <Combobox
                  label="İl-İlçe"
                  onChangeProvince={handleProvinceChange}
                  onChangeDistrict={handleDistrictChange}
                />
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
                    <i className="fas fa-search" style={{ marginRight: '8px' }} />
                    Ara
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
       <FlatList searchTerm={searchTerm} title=" "/>
      </section>
      <Footer />
    </>
  );
};

export default Market;

  // const filterFlatByLocation = (flat) => {
  //   if (selectedProvince && selectedDistrict) {
  //     return (
  //       flat.location.province === selectedProvince &&
  //       flat.location.district === selectedDistrict
  //     );
  //   }
  //   if (selectedProvince) {
  //     return flat.location.province === selectedProvince;
  //   }
  //   return true;
  // };

  // const filteredFlat = flat.filter(filterFlatByLocation);
