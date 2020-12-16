import React, { Component } from 'react';
import axios from 'axios';

export default class CreatePost extends Component {
    constructor(props) {
        super(props);

        this.onChangeMessage = this.onChangeMessage.bind(this);
        this.onChangeUser = this.onChangeUser.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            message: "",
            user: "",
        }
    }


componentDidMount() {
    axios.get('http://localhost:5000/posts/')
    .then(response => {
        if (response.data.length >0 ) { //Check if atleast 1 post in database
            this.setState({
                posts: response.data.map(post => post.message),
                post: response.data[0].message
            })
        } 
    })
}

onChangeMessage(e) {
    this.setState({
        message: e.target.value
    });
}

onChangeUser(e) {
    this.setState({
        user: e.target.value
    });
}

onSubmit(e) {
    e.preventDefault();

    const post = {
        message: this.state.message,
        user: this.state.user,
    }

    //message to database
    console.log(post);

    //submit to database via axios API
    axios.post('http://localhost:5000/posts/add', post)
            .then(res => console.log(res.data)); //log the result to console

    //Take user back to homepage
    window.location = '/';
}

    render() {
        return (
            <div>
                <h3>Create new post</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input type="text"
                        required
                        className="form-control"
                        value={this.state.user}
                        onChange={this.onChangeUser}
                        />
                    </div>
                    <div className="form-group">
                        <label>Message: </label>
                        <input type="text"
                        required
                        className="form-control"
                        value={this.state.message}
                        onChange={this.onChangeMessage}
                        />
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Create Post" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}