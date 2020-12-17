import React, { setState}from "react";
import axios from "axios";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component";
import PostList from "./components/post-list.component.jsx";
import CreatePost from "./components/create-post.component.jsx";
import CreateUser from "./components/create-user.component";
import loginUser from "./components/login-user.component";



function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br />
        <Route path="/" exact component={PostList} />
        <Route path="/createPost" exact component={CreatePost} />
        <Route path="/createUser" exact component={CreateUser} />
        <Route path="/loginUser" exact component={loginUser} />
      </div>
    </Router>
  );
}

export default App;
