import React, { useContext } from 'react'
import './App.css';
import FlatDetail from "./components/FlatDetail"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Home from "./components/Home"
import Contact from "./components/Contact"
import Market from "./components/Market"
import Blog from "./components/Blog"
import BlogDetail from "./components/BlogDetail"
import FlatAdd from './components/FlatAdd';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from './components/Login';
import Register from './components/Register';
import { DataProvider, GlobalState } from './GlobalState';


function App() {
  const state = useContext(GlobalState)
  
  return (
    <DataProvider>
      <Router>
        <div className="App">
          <Header />
          <Route path="/" exact component={Home}></Route>
          <Route path="/contact" component={Contact}></Route>
          <Route path="/market" component={Market}></Route>
          <Route path="/blog" exact component={Blog}></Route>
          <Route path="/blog/:id" component={BlogDetail}></Route>
          <Route path="/flat/:slug" component={FlatDetail}></Route>
          <Route path="/flatadd" component={FlatAdd}></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/register" component={Register}></Route>
          <Footer />
        </div>
      </Router>
    </DataProvider>
  );
}

export default App;
