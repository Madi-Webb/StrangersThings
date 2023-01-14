import { useState } from "react";
import { Link, useOutletContext } from "react-router-dom";

import { BiUser, BiLockAlt, BiErrorCircle } from 'react-icons/bi';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

import { loginUserFetch, usersMeFetch } from "../../api/users";

const LoginForm = () => {

    const { setLoggedIn, setProfileData } = useOutletContext();
    // console.log("profileData on LOGIN: ", profileData);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [passwordVisibility, setPasswordVisibility] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");


    async function loginFormSubmitHandler(event) {
        event.preventDefault();

        const loginFetchData = await loginUserFetch(username, password);

        if (loginFetchData.success) {
            setLoggedIn(loginFetchData.success);
            localStorage.setItem("token", loginFetchData.data.token);
            
            const userInfoData = await usersMeFetch();
            setProfileData(userInfoData);
        } else {
            setErrorMessage(loginFetchData.error.message);
        }
    }


    function togglePasswordVisibility() {
        setPasswordVisibility(!passwordVisibility);
        let passwordType = document.getElementById("passwordInput");
        passwordType.type === "password" ?  passwordType.type = "text" : passwordType.type = "password";
    }


    return (
        <div className="vert-center-container">

            <form  onSubmit={loginFormSubmitHandler} className='user-form'>
                <label>Enter Username:</label>
                <div className='input-container'>
                    <BiUser />
                    <input type='text' value={username} onChange={(event) => setUsername(event.target.value)}></input>
                </div>

                <br />

                <label>Enter Password:</label>
                <div className='input-container'>
                    <BiLockAlt />
                    <input type='password' value={password} id='passwordInput' onChange={(event) => setPassword(event.target.value)}></input>
                {
                    passwordVisibility ? <AiOutlineEye onClick={togglePasswordVisibility} className='clickable'/> : <AiOutlineEyeInvisible onClick={togglePasswordVisibility} className='clickable'/>
                }
                </div>

                <br />

                <button type='submit' className='login-button'>Login</button>
            </form>

            <Link to="/profile/register" className="register-link">Don't have an account? Click here to sign up!</Link>

            {
                errorMessage ? <p className='error'><BiErrorCircle />{errorMessage}</p> : null
            }

        </div>
    )
};

export default LoginForm;