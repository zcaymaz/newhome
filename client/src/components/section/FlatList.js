import React, { useEffect, useState } from 'react';
import Title from "../common/Title";
import FlatItem from "../FlatItem";
import axios from 'axios';

const FlatList = ({searchTerm, title}) => {
  const [flat, setFlat] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3001/api/task/`)
      .then((res) => {
        const reversedFlat = res.data.reverse();
        setFlat(reversedFlat);
      })
      .catch((error) => { console.error(error); });
  }, []);

  const filteredFlat = flat.filter((flat) =>
  flat.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
