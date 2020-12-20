import React, { Component } from "react";
import axios from "axios";

export default class CreateUser extends Component {
  constructor(props) {
    super(props);

    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      password: "",
      username: "",
    };
  }

  componentDidMount() {
    this.setState({
      password: "",
      username: "",
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      password: this.state.password,
      username: this.state.username,
    };

    //log submit to console
    console.log(user);

    //Check the correct length for username and password (4 and 8)
    if (user.password.length < 8 || user.username.length < 4) {
      alert("Username or password too short!");
      window.location = "/createUser";
    } else {
      //send user to backend via axios
      axios
        .post("http://localhost:5000/users/add", user, {
          withCredentials: true,
        })
        .then((res) => console.log(res.data));

      //Take user back to homepage
      alert("Account created succesfully!");
      window.location = "/";
      
    }
  }

  render() {
    return (
      <div>
        <h3>Create New User</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username: (min. 4 characters)</label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}
            />
          </div>
          <div className="form-group">
            <label>Password: (min. 8 characters)</label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.password}
              onChange={this.onChangePassword}
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Create User"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
