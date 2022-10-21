import React from "react";
import { useOutletContext, useNavigate } from "react-router-dom";


const Index = () => {
    const [,, profileData, , loggedIn] = useOutletContext();
    const navigate = useNavigate();

    
    return (
        <div className="centered">
            <h1>Welcome to</h1>
            <h1 className="big title">Stranger's Things</h1>

            {
                loggedIn ? 
                <div>
                    <h2>Logged in as {profileData.username}</h2>
                    <button onClick={() => navigate("/profile")} className="edit-button">View Profile</button>
                </div>
                : <p>not logged in</p>
            }
        </div>
    )

}

export default Index;