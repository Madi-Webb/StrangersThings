import React, { useState } from "react";

const RegisterForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    // const [token, setToken] = useState("");

    async function formSubmitHandler(event) {
        event.preventDefault();

        // TODO: provide feedback on the form if the user provides incorrect credentials, or bad usernames or passwords

        try {
            const response = await fetch(
                "https://strangers-things.herokuapp.com/api/2209-ftb-mt-web-ft/users/register",
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
            setToken(data.data.token);
            // localStorage.setItem("token", data.data.token)
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
            <form onSubmit={formSubmitHandler}>
                <label>Enter New Username Here</label>
                <input type="text" value={username} onChange={updateUsernameState}></input>

                <br/>

                <label>Enter New Password Here</label>
                <input type="text" value={password} onChange={updatePasswordState}></input>

                <br/>

                {/* TODO:  */}
                {/* <label>Confirm Password</label>
                <input type="text" value={password} onChange={updatePasswordState}></input>

                <br/> */}

                <button type="submit">Register For New Account</button>
            </form>
        </div>
    )
}

export default RegisterForm;