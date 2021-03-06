import React, { Component} from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

    render(){
        return (
            <nav className="navbar navbar-expand-lg font-weight-bold">
                <Link to="/" className="navbar-brand">MICROBLOG</Link>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="navbar-item">
                            <Link to="/" className="nav-link">Posts</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/createPost" className="nav-link">Create post</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/createUser" className="nav-link">Create user</Link>
                        </li>
                        <li className="navbar-item hide">
                            <Link to="/loginUser" className="nav-link">Login User</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/findPost" className="nav-link">Find post</Link>
                        </li>

                    </ul>
                </div>
            </nav>
        )
    }
}