import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

import { BiUser, BiLockAlt, BiErrorCircle } from 'react-icons/bi';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

import { registerUserFetch, usersMeFetch } from "../../api/users";


const RegisterForm = () => {

    const { setLoggedIn, setProfileData } = useOutletContext();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [passwordVisibility, setPasswordVisibility] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();


    async function registerFormSubmitHandler(event) {
        event.preventDefault();

        // TODO: provide feedback on the form if the user provides incorrect credentials, or bad usernames or passwords

        const registerFetchData = await registerUserFetch(username, password);

        console.log("registerFetchData: ", registerFetchData);

        if (registerFetchData.success) {
            setLoggedIn(registerFetchData.success);
            localStorage.setItem("token", registerFetchData.data.token);
            
            const userInfoData = await usersMeFetch();
            setProfileData(userInfoData);
            navigate("/profile");
        } else {
            setErrorMessage(registerFetchData.error.message);
            console.log(registerFetchData.error.message);
        }
    }


    function togglePasswordVisibility() {
        setPasswordVisibility(!passwordVisibility);
        let passwordType = document.getElementById("passwordInput");
        passwordType.type === "password" ?  passwordType.type = "text" : passwordType.type = "password";
    }


    return (
        <div className="vert-center-container">
            <form onSubmit={registerFormSubmitHandler} className='user-form'>
                <label>Enter New Username:</label>
                <div className='input-container'>
                    <BiUser />
                    <input type='text' value={username} onChange={(event) => setUsername(event.target.value)}></input>
                </div>

                <br />

                <label>Enter New Password:</label>
                <div className='input-container'>
                    <BiLockAlt />
                    <input type='password' value={password} id='passwordInput' onChange={(event) => setPassword(event.target.value)}></input>
                {
                    passwordVisibility ? <AiOutlineEye onClick={togglePasswordVisibility} className='clickable'/> : <AiOutlineEyeInvisible onClick={togglePasswordVisibility} className='clickable'/>
                }
                </div>

                <br />

                <button type='submit' className='login-button'>Register New Account</button>
            </form>
            {
                errorMessage ? <p className='error'><BiErrorCircle />{errorMessage}</p> : null
            }
        </div>
    )
};

export default RegisterForm;