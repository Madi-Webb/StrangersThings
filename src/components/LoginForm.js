import React, { useState } from "react";
import { Link, useOutletContext } from "react-router-dom";


const LoginForm = () => {
    const [,, profileData, setProfileData, loggedIn, setLoggedIn] = useOutletContext();
    // console.log("profileData on LOGIN: ", profileData);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    async function formSubmitHandler(event) {
        event.preventDefault();

        try {
            const response = await fetch(
                "https://strangers-things.herokuapp.com/api/2209-ftb-mt-web-ft/users/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        user: {
                            username: username,
                            password: password
                        }
                    })
                }
            )
            const data = await response.json();
            console.log("This is our translated data: ", data);
            if (data.success) {
                setLoggedIn(data.success);
                // setToken(data.data.token);
                localStorage.setItem("token", data.data.token);
                fetchUserInfo();
            }
        } catch(error) {
            console.log(error);
        }
    }

    async function fetchUserInfo(event) {    
        try {
            const response = await fetch(
                "https://strangers-things.herokuapp.com/api/2209-ftb-mt-web-ft/users/me",
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    },
                })
                
            const data = await response.json();
            console.log("User profile data: ", data.data);
            setProfileData(data.data);
        } catch(error) {
            console.log(error);
        }
    }


    return (
        <div>
            <form onSubmit={formSubmitHandler} className="login-form">
                <label>Enter Username Here</label>
                <input type="text" value={username} onChange={(event) => setUsername(event.target.value)}></input>

                <br/>

                <label>Enter Password Here</label>
                <input type="text" value={password} onChange={(event) => setPassword(event.target.value)}></input>

                <br/>

                <button type="submit">Login</button>
            </form>
            <div className="centered">
                <Link to="/profile/register">No account? Click here to sign up</Link>
            </div>
        </div>
    )
}

export default LoginForm;