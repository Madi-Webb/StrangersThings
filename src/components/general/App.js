import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import './general.css';
import '../profile/profile.css';
import '../posts/posts.css';

import { fetchAllPosts } from '../../api/posts';
import { usersMeFetch, testUserFetch } from "../../api/users";

import Header from "./Header";


const App = () => {

    const [ posts, setPosts ] = useState([]);
    const [ profileData, setProfileData ] = useState();
    const [ loggedIn, setLoggedIn ] = useState(false);


    useEffect(() => {
        getPosts();
        checkForUser();
    }, [])


    async function getPosts() {
        const allPostsData = await fetchAllPosts();

        if ( allPostsData.success ) {
            setPosts(allPostsData.data.posts);
        } else {
            console.log(allPostsData.error);
        }
    }


    async function checkForUser() {
        const testUserData = await testUserFetch();

        if (testUserData.success) {
            console.log(testUserData.data.user.username + " " + testUserData.data.message);
            setLoggedIn(true);
            const userInfoFetch = await usersMeFetch();
            setProfileData(userInfoFetch);
        } else {
            // console.log(testUserData.error.message);    // not logged in
        }
    }


    return (
        <div>
            <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} setProfileData={setProfileData} />

            <Outlet context={{ posts, setPosts, profileData, setProfileData, loggedIn, setLoggedIn }} />
        </div>
    )
    
}

export default App;