import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";



const LoginForm = () => {
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
                console.log("successful login");
                console.log("This is our token: ", data.data.token);
            }
        } catch(error) {
            console.log(error);
        }
    }

    function updateUsernameState(event) {
        setUsername(event.target.value);
    }

    function updatePasswordState(event) {
        setPassword(event.target.value);
    }

    return (
        <div>
            <form onSubmit={formSubmitHandler} className="login-form">
                <label>Enter Username Here</label>
                <input type="text" value={username} onChange={updateUsernameState}></input>

                <br/>

                <label>Enter Password Here</label>
                <input type="text" value={password} onChange={updatePasswordState}></input>

                <br/>

                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default LoginForm;