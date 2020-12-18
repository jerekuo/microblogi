import React, { setState}from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css';
import './App.css';

import Navbar from "./components/navbar.component";
import PostList from "./components/post-list.component.jsx";
import CreatePost from "./components/create-post.component.jsx";
import CreateUser from "./components/create-user.component";
import loginUser from "./components/login-user.component";
import findPost from "./components/find-post.component";



function App() {
  
  return (
    <div className="background">
      <Router>
        <div class="container-fluid">
          <Navbar />
          <br />
          <Route path="/" exact component={PostList} />
          <Route path="/createPost" exact component={CreatePost} />
          <Route path="/createUser" exact component={CreateUser} />
          <Route path="/loginUser" exact component={loginUser} />
          <Route path="/findPost" exact component={findPost} />
        </div>
      </Router>
      </div>
  );
}

export default App;
