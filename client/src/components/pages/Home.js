import React from "react"
import FlatList from "../section/FlatList"
import Banner from "../section/Banner"
import BestFlatList from "../section/BestFlatList"
import Footer from "../Footer"

const Home = () => {
    return (
        <React.Fragment>
            <Banner />
            <FlatList />
            <BestFlatList />
            <Footer />
        </React.Fragment>
    )
}

export default Home;