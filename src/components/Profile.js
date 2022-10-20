import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";

import LoginForm from "./LoginForm";
import ProfilePostPreview from "./ProfilePostPreview";



const Profile = () => {
    const postsData = useOutletContext();
    // console.log("This is our postsData: ", postsData);
    // console.log("Logged in: ", loggedIn);

    const [username, setUsername] = useState("");
    const [posts, setPosts] = useState([]);


    async function fetchUserInfo(event) {
        // event.preventDefault(); // TODO: make this work to stop from running constantly?

        try {
            const response = await fetch(
                "https://strangers-things.herokuapp.com/api/2209-ftb-mt-web-ft/users/me",
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + localStorage.getItem("token")
                    },
                })
                
            const data = await response.json();
            console.log("This is our translated user data: ", data);
            setUsername(data.data.username);
            setPosts(data.data.posts);
        } catch(error) {
            console.log(error);
        }
    }
    fetchUserInfo();

    // async function deletePost(event) {
    //     try {
    //         const response = await fetch(
    //             `https://strangers-things.herokuapp.com/api/2209-ftb-mt-web-ft/posts/${id}`,
    //             {
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                     "Authorization": `Bearer ${localStorage.getItem("token")}`
    //                 },
    //             })
                
    //         const data = await response.json();
    //         console.log("This is our translated DELETE POST data: ", data);
    //     } catch(error) {
    //         console.log(error);
    //     }
    // }

    

    return (
        <div>
            {
                username!="" ? 
                <h2 className="centered">Welcome {username}!</h2>
                : <LoginForm />
            }

            <h2>Your posts</h2>
            {
                posts.length ? posts.map((post, idx) => {
                    return <ProfilePostPreview key={idx} post={post}/>
                }) : <p>No posts to display</p>
            }

        </div>

    )

}

export default Profile;