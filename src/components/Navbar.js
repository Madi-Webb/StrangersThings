import React from "react";
import { Link } from "react-router-dom"; 

const Navbar = (props) => {

    return (
        <nav className="navbar">
            <Link to="/">Home</Link>
            <Link to="posts">Posts</Link>
            <Link to="profile">Profile</Link>

            {
                props.loggedIn ? <Link to="profile/logout">Logout</Link> : <Link to="profile">Login</Link>
            }

        </nav>
    )
};

export default Navbar; 