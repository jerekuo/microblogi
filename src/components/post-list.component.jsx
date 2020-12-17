import React, { Component } from 'react';
import axios from 'axios';

//<Link to={"/edit/"+props.exercise._id}>edit</Link> | 
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

        this.deleteMessage = this.deleteMessage.bind(this);

        this.state = { messages: [] };
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

    postList() {
        return this.state.messages.map(currentMessage => {
            return <Message message={currentMessage} deleteMessage={this.deleteMessage} key={currentMessage._id} />;
        })
    }

    render() {
        return (
            <div>
                <h3>Wall of Posts</h3>
                <table className="table">
                    <thead className="thead-light">
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