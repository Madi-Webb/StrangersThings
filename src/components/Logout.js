import React, { useState } from "react";
import { useOutletContext, Link } from "react-router-dom";


const Logout = () => {
    const [,, profileData, setProfileData, loggedIn, setLoggedIn] = useOutletContext();

    function logOut() {
        // console.log("logging out");
        localStorage.removeItem("token");
        setProfileData({});
        setLoggedIn(false);
    }


    return (
        <div>
            {
                loggedIn ? 
                <div className="vert-flex-container">
                    <h2>Are you sure you want to log out of your account {profileData.username}?</h2>
                    <button className="delete-button" onClick={logOut}>LOGOUT</button>
                </div>

                : 
                <div className="vert-flex-container">
                    <h2>Goodbye {":("}</h2>
                    <Link to="/">Go Home</Link>
                </div>
            }
        </div>
    )
}

export default Logout;