import React, { useEffect, useState } from 'react';
import Title from "./Title";
import FlatItem from "./FlatItem";
import axios from 'axios';

const FlatList = (props) => {
  const [flat, setFlat] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3001/api/task/`)
      .then((res) => {
        setFlat(res.data);
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
              src={flat.images && flat.images.length > 0 ? flat.images[0] : flat.image}
              onClick={() => localStorage.setItem('flatId', flat._id)}
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
