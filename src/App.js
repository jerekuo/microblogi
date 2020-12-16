import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

import Navbar from "./components/navbar.component";
import PostList from "./components/post-list.component.jsx";
import CreatePost from "./components/create-post.component.jsx";
import CreateUser from "./components/create-user.component";


function App() {
  return (
    <Router>
      <div className="container">
      <Navbar />
      <br/>
      <Route path="/" exact component={PostList} />
      <Route path="/createPost" exact component={CreatePost} />
      <Route path="/createUser" exact component={CreateUser} />
      </div>
    </Router>
  );
}

export default App;
