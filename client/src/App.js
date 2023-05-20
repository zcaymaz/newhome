import React from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import { DataProvider } from './GlobalState';
import FlatDetail from "./components/pages/FlatDetail"
import Header from "./components/Header"
import Home from "./components/pages/Home"
import Market from "./components/pages/Market"
import DashBoard from "./components/pages/DashBoard"
import Blog from "./components/pages/Blog"
import BlogDetail from "./components/pages/BlogDetail"
import FlatAdd from './components/pages/FlatAdd';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import MyProfile from './components/pages/MyProfile';
import ProjectAdd from './components/pages/ProjectAdd';
import Test from './components/pages/Test';


function App() {
  
  return (
    <DataProvider>
      <Router>
        <div className="App">
          <Header />
          <Route path="/" exact component={Home}></Route>
          <Route path="/market" component={Market}></Route>
          <Route path="/dashboard" component={DashBoard}></Route>
          <Route path="/myprofile" component={MyProfile}></Route>
          <Route path="/blog" exact component={Blog}></Route>
          <Route path="/blogdetail/:id" component={BlogDetail}></Route>
          <Route path="/flatdetail/:id" component={FlatDetail}></Route>
          <Route path="/flatadd" component={FlatAdd}></Route>
          <Route path="/projectadd" component={ProjectAdd}></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/register" component={Register}></Route>
          <Route path="/test" component={Test}></Route>
        </div>
      </Router>
    </DataProvider>
  );
}

export default App;
