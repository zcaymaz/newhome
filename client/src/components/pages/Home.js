import React from "react"
import FlatList from "../section/FlatList"
import Banner from "../section/Banner"
import BestFlatList from "../section/BestFlatList"
import Footer from "../Footer"
import BlogList from "../section/BlogList"

const Home = () => {
    return (
        <React.Fragment>
            <Banner />
            <FlatList />
            <BestFlatList />
            <BlogList />
            <Footer />
        </React.Fragment>
    )
}

export default Home;