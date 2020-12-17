import React, { Component } from 'react';
import axios from 'axios';


export default class CreateUser extends Component {
    constructor(props) {
        super(props);

        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            password: "",
            username: "",
        }
    }


    componentDidMount() {
        this.setState({
            password: 'salasana',
            username: 'test user',
        })
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const user = {
            password: this.state.password,
            username: this.state.username,
        }

        //log submit to console
        console.log(user);

        //send user to backend via axios
        axios.post('http://localhost:5000/users/add', user, {withCredentials: true})
            .then(res => console.log(res.data));



        //Take user back to homepage
        window.location = '/';
    }


    render() {
        return (
            <div>
                <h3>Create New User</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.password}
                            onChange={this.onChangePassword}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create User" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}