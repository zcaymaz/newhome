import React, { useEffect, useState } from 'react';
import Title from "../common/Title";
import FlatItem from "../FlatItem";
import axios from 'axios';

const FlatList = ({ searchTerm, title, selectedProvince, selectedDistrict }) => {
  const [flat, setFlat] = useState([]);
  const [flatLocation, setFlatLocation] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3001/api/task/`)
      .then((res) => {
        const randomData = getRandomElements(res.data, 9);
        setFlat(randomData);
        const flatLocations = randomData.map((flat) => flat.location);
        setFlatLocation(flatLocations);
      })
      .catch((error) => { console.error(error); });
  }, []);
  
  function getRandomElements(array, count) {
    const shuffledArray = array.sort(() => Math.random() - 0.5);
    return shuffledArray.slice(0, count);
  }

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
  console.log(flatLocation)
  return (
    <section className="section-all-re">
      <div className="container">
        <Title title={title || "Öne Çıkan İlanlar"} />
        <div className="row">
          {filteredFlat.map((flat) => (
            <FlatItem
              key={flat._id}
              flatId={flat._id}
              src={flat.images && flat.images.length > 0 ? flat.images[0] : flat.image}
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
  );
};

export default FlatList;
