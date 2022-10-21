import React, {useEffect, useState} from "react";
import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";

const Homepage = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        async function fetchThingsData() {
            try {
                const response = await fetch('https://strangers-things.herokuapp.com/api/2209-FTB-MT-WEB-FT/posts');
                const results = await response.json();
                // console.log(results);
                setPosts(results.data.posts);
            } catch (error) {
                console.log(error);
            }
        }
        fetchThingsData();

    }, [])

    const [profileData, setProfileData] = useState({});

    useEffect(() => {
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
                setProfileData(data.data);
            } catch(error) {
                console.log(error);
            }
        }
        fetchUserInfo();
    }, []);

    const [ loggedIn, setLoggedIn ] = useState(false);
    useEffect(() => {
        async function isLoggedIn(event) {    
            try {
                const response = await fetch(
                    "https://strangers-things.herokuapp.com/api/2209-ftb-mt-web-ft/test/me",
                    {
                        method: "GET",
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem("token")}`
                        }
                    })
                const data = await response.json();
                setLoggedIn(data.success);
            } catch(error) {
                console.log(error);
            }
        }
        isLoggedIn();
    }, []);

    return (
        <div>
            <div className="header">
                <h1 className="title">Stranger's Things</h1>
                <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
            </div>

            <Outlet context={[posts, setPosts, profileData, setProfileData, loggedIn, setLoggedIn]}/>
        </div>
    )
    
}

export default Homepage;