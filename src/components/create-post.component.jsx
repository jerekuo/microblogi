import React, { Component } from "react";
import axios from "axios";
import crypto from "crypto";

//hash passwords
const getHashedPassword = (password) => {
  const sha256 = crypto.createHash("sha256");
  const hash = sha256.update(password).digest("base64");
  return hash;
};

export default class CreatePost extends Component {
  constructor(props) {
    super(props);

    this.onChangeMessage = this.onChangeMessage.bind(this);
    this.onChangeUser = this.onChangeUser.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      message: "",
      user: "",
      password: "",
      users: [],
    };
  }

  //load all users to array, for authentication
  componentDidMount() {
    axios
      .get("http://localhost:5000/users/")
      .then((response) => {
        this.setState({ users: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onChangeMessage(e) {
    this.setState({
      message: e.target.value,
    });
  }

  onChangeUser(e) {
    this.setState({
      user: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    var auth = false;

    const post = {
      message: this.state.message,
      user: this.state.user,
      password: this.state.password,
    };

    if (post.message.length > 299 || post.message.length === 0) {
      alert("Message must be between 1-299 characters!");
      window.location = "/createPost";
    } else {
      if (post.user.length === 0) {
        alert("Please, enter an username!");
        window.location = "/createPost";
      } else {
        this.state.users.forEach((e) => {
          //Checks if credentials are found in database
          if (e.username === post.user && e.password === getHashedPassword(post.password)) {
            auth = true;
            //message to database
            console.log(post);

            //submit to database via axios API
            axios
              .post("http://localhost:5000/posts/add", post)
              .then((res) => console.log(res.data)); //log the result to console

            //Take user back to homepage
            window.location = "/";
          } 
        });
      }
    }
    if (auth === false) {
      alert("Username or password wrong!");
      this.setState({password: ""});
    }

  }


  render() {
    return (
      <div>
        <h3>Create new post</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <form class="col s12">
              <div class="row">
                <div class="input-field col s6">
                  <label>Username: </label>
                  <input
                    value={this.state.user}
                    onChange={this.onChangeUser}
                    type="text"
                    className="form-control"
                    data-length="10"
                  />
                </div>
              </div>
            </form>
            <form class="col s12">
              <div class="row">
                <div class="input-field col s6">
                  <label>Password: </label>
                  <input
                    value={this.state.password}
                    onChange={this.onChangePassword}
                    type="text"
                    className="form-control"
                  />
                </div>
              </div>
            </form>
          </div>
          <div class="row">
            <form class="col s12">
              <div class="row">
                <div class="input-field col s6">
                  <label>Message: (max. length 299 chars)</label>
                  <input
                    type="text"
                    required
                    data-length="299"
                    className="form-control"
                    value={this.state.message}
                    onChange={this.onChangeMessage}
                  />
                </div>
              </div>
            </form>
          </div>

          <div className="form-group">
            <input
              type="submit"
              value="Create Post"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
