import React, { useEffect, useState } from 'react';
import Title from "./Title";
import FlatItem from "./FlatItem";
import axios from 'axios';

const FlatList = (props) => {
  const [flats, setFlats] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3001/api/task/`, {
      params: { useremail: localStorage.getItem('email'), name: localStorage.getItem('name'), ObjectId: localStorage.getItem('flatId') }
    })
      .then((res) => {
        const data = res.data.map((flat) => ({
          ...flat,
          images: flat.images.map((image) => {
            const img = new Image();
            img.src = `data:image/jpeg;base64,${image}`;
            return { original: img.src, thumbnail: img.src };
          })
        }));
        setFlats(data);
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
          {flats.map((flat) => (
            <FlatItem
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
