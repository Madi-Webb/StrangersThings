import { useEffect, useState } from "react";

import { usersMeFetch, testUserFetch } from "../../api/users";


import Navbar from "./Navbar";


const Header = ({ loggedIn, setLoggedIn, setProfileData }) => {
    
    const [ tempLoggedIn, setTempLoggedIn] = useState(false);
    const [ tempProfileData, setTempProfileData] = useState(false);


    useEffect(() => {
        checkForUser();
    }, [])


    async function checkForUser() {
        const testUserData = await testUserFetch();

        if (testUserData.success) {
            !setLoggedIn ? setTempLoggedIn(true) : setLoggedIn(true);
            const userInfoFetch = await usersMeFetch();

            !setProfileData ? setTempProfileData(userInfoFetch) : setProfileData(userInfoFetch);
        } else {
            // console.log(testUserData.error.message);    // not logged in
        }
    }


    function logOut() {
        // console.log("logging out");
        localStorage.removeItem("token");
        setProfileData();
        setLoggedIn(false);
    }


    return (
        <div className="header-container">
            <header>
                <h1 className="title">Stranger's Things</h1>
                <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
            </header>
            {
                loggedIn ? <div className="header-tag" onClick={logOut}>LOG OUT</div> : null
            }
        </div>
    )
    
}

export default Header;