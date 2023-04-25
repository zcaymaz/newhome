import FlatList from "./FlatList"
import Banner from "./Banner"
import React from "react"
import TeamList from "./TeamList"
import BestFlatList from "./BestFlatList"

const Home=()=>{
    return (
        <React.Fragment>
            <Banner/>
            <FlatList/>
            <BestFlatList/>
            <TeamList/>
        </React.Fragment>
    )
}

export default Home;