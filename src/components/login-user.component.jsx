import React, { Component } from 'react';
import axios from 'axios';


export default class LoginUser extends Component {
    
    constructor(props) {
        
        super(props);

        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            password: "",
            username: "",
            currentUser: "",
        }
    }


    componentDidMount() { 
        this.setState({
            password: 'salasana',
            username: 'test user',
        })
    }

    getUser(e) {
        axios.get('http://localhost:5000/users/', {withCredentials: true})
        .then((res) => console.log(res));
        
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
        
        
        //input from user
        const user = {
            password: this.state.password,
            username: this.state.username,
        }

        //send user to backend via axios
        axios.post('http://localhost:5000/users/login', user, {withCredentials: true})
            .then(res => console.log(res.data));


        

        console.log(this.state.currentUser +" ON TÄMÄN HETKINEN KÄYTTÄJÄ!!!");

        
        //Take user back to homepage
        window.location = '/';
        
    }


    render() {
        return (
            <div>
                <h3>Login user</h3>
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
                        <input type="submit" value="Log in" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}