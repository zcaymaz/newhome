import React, { useState } from "react";
import FlatList from "../section/FlatList";
import Banner from "../section/Banner";
import BestFlatList from "../section/BestFlatList";
import Footer from "../Footer";
import BlogList from "../section/BlogList";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <Banner value={searchTerm} onChange={handleSearch} />
      <FlatList searchTerm={searchTerm} />
      <BestFlatList />
      <BlogList />
      <Footer />
    </>
  );
};

export default Home;
