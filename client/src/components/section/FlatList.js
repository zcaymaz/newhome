import React, { useEffect, useState } from 'react';
import Title from "../common/Title";
import FlatItem from "../FlatItem";
import axios from 'axios';

const FlatList = () => {
  const [flat, setFlat] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3001/api/task/`)
      .then((res) => {
        const reversedFlat = res.data.reverse();
        setFlat(reversedFlat);
      })
      .catch((error) => { console.error(error); });
  }, []);

  const title = {
    text: "Öne Çıkan İlanlar",
    description: ""
  };

  return (
    <section className="section-all-re">
      <div className="container">
        <Title title={title.text} description={title.description} />
        <div className="row">
          {flat.map((flat) => (
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
