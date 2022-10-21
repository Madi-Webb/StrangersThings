import React, { useState } from "react";
import { useOutletContext, Link } from "react-router-dom";



const Logout = () => {
    const [,, profileData, setProfileData, loggedIn, setLoggedIn] = useOutletContext();
    console.log("This is our profileData on LOGOUT: ", profileData);

    function logOut() {
        console.log("logging out");
        localStorage.removeItem("token");
        setProfileData({});
        setLoggedIn(false);
    }


    return (
        <div>
            {
                loggedIn ? 
                <div>
                    <h2>Are you sure you want to log out of your account {profileData.username}?</h2>
                    <button onClick={logOut}>LOGOUT</button>
                </div>

                : 
                <div>
                    <h2>Goodbye {":("}</h2>
                    <Link to="/">Go Home</Link>
                </div>

            }

        </div>
    )
}

export default Logout;