import React, { Component } from 'react';
import axios from 'axios';

//component for post
const Message = props => (
    <tr>
        <td>{props.message.user}</td>
        <td>{props.message.message}</td>
        <td>
            <a href="#" onClick={() => { props.deleteMessage(props.message._id) }}>delete</a>

        </td>
    </tr>
)

export default class PostList extends Component {
    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);

        this.state = { 
            username: "",
            messages: [] };
    }
    //Load all posts to "message" array
    componentDidMount() {
        this.setState({
            username: 'test user'
        })
    }


    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    postList() {
        return this.state.messages.map(currentMessage => {
            return <Message message={currentMessage} deleteMessage={this.deleteMessage} key={currentMessage._id} />;
        })
    }

    onSubmit(e) {
        e.preventDefault();
        
        
        //input from user
        const user = {
            username: this.state.username,
        }

        //Get posts from defined username
        axios.post('http://localhost:5000/posts/find', user)
            .then(response => {
                this.setState({ messages: response.data })
            })
            .catch((error) => {
                console.log(error);
            })


        //load posts to "message" array

        console.log(this.state.currentUser +" ON TÄMÄN HETKINEN KÄYTTÄJÄ!!!");

        
        
    }

    render() {
        return (
            <div>
                <h3>Find posts by username!</h3>
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
                        <input type="submit" value="Search" className="btn btn-primary"/>
                    </div>
                </form>
                <h3>Posts by username!</h3>
                <table className="table">
                    <thead className="thead-transparent">
                        <tr>
                            <th>username</th>
                            <th>message</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.postList()}
                    </tbody>
                </table>
            </div>
        )
    }
}