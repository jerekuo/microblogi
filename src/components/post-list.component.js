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

    //methos for delete post button, currently deleted

    deleteMessage(id) {
        axios.delete('http://localhost:5000/posts/' + id)
            .then(res => console.log(res.data));
        this.setState({
            messages: this.state.messages.filter(el => el._id !== id) //remove deleted post from array
        })
    };

    //filling messages array with posts
    postList() {
        return this.state.messages.map(currentMessage => {
            return <Message message={currentMessage} deleteMessage={this.deleteMessage} key={currentMessage._id} />;
        })
    }

    render() {
        return (
            <div className="row">
                <div class="cols s12 m6">
                    <h3>WALL</h3>
                    <table className="table">
                        <thead className="thead-transparent">
                            <tr>
                            </tr>
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