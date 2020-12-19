import React, { Component } from 'react';
import axios from 'axios';

//component for post
const Message = props => (
    <div>
        <div class="card white cols 12 m6" >
            <div class="card-content flow-text">
            <span class="card-title">{props.message.user}</span>
            <p>{props.message.message}</p>
            </div>
        </div>



    </div>
)

export default class PostList extends Component {
    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.deleteMessage = this.deleteMessage.bind(this);

        this.state = { 
            username: "",
            messages: [] };
    }
    //Load all posts to "message" array
    componentDidMount() {
        axios.get('http://localhost:5000/posts/')
            .then(response => {
                this.setState({ messages: response.data })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    deleteMessage(id) {
        axios.delete('http://localhost:5000/posts/' + id)
            .then(res => console.log(res.data));
        this.setState({
            messages: this.state.messages.filter(el => el._id !== id) //remove deleted post from array
        })
    };



    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    postList() {
        return this.state.messages.map(currentMessage => {
            if (currentMessage.user == this.state.username) {
                return <Message message={currentMessage} deleteMessage={this.deleteMessage} key={currentMessage._id} />;
            }
           
        })
    }

    onSubmit(e) {
        e.preventDefault();
        
        
        //input from user

        //Get posts from defined username
        axios.get('http://localhost:5000/posts/')
            .then(response => {
                this.setState({ messages: response.data })
                alert("toimii");
            })
            .catch((error) => {
                console.log(error);
            })


        //load posts to "message" array    
    }

    render() {
        return (
            <div className="background">
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
                        <input type="submit" value="Search" className="btn btn-primary hide"/>
                    </div>
                </form>
                <h3>Posts by username!</h3>
                <table className="table">
                    <thead className="thead-transparent">
                    </thead>
                    <tbody>
                        {this.postList()}
                    </tbody>
                </table>
            </div>
            </div>
        )
    }
}