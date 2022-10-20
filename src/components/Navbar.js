import React from "react";
import { Link } from "react-router-dom"; 

const Navbar = () => {
    return (
        <nav className="navbar">
            <Link to="/">Home</Link>
            <Link to="posts">Posts</Link>
            <Link to="profile">Profile</Link>
        </nav>
    )
};

export default Navbar; 