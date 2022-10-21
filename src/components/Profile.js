import React from "react";
import { useOutletContext } from "react-router-dom";

import LoginForm from "./LoginForm";
import ProfilePostPreview from "./ProfilePostPreview";
import Message from "./Message";

const Profile = () => {
    const [,, profileData, setProfileData, loggedIn] = useOutletContext();
    // console.log(profileData);

    
    return (
        <div>
            {
                loggedIn ? 
                <div>
                    <h2 className="centered">Welcome {profileData.username}!</h2>
                    <h2>Your posts</h2>
                    {
                        profileData.posts ? profileData.posts.map((post, idx) => {
                            if (post.active) return <ProfilePostPreview key={idx} post={post}/>
                        }) : <p>No posts to display</p>
                    }
                    <h2>Your messages</h2>
                    {
                        profileData.messages ? profileData.messages.map((msg, idx) => {
                            return <Message key={idx} msg={msg}/>
                        }) : <p>No messages to display</p>
                    }
                    
                </div>

                : <LoginForm/>
            }
        </div>

    )

}

export default Profile;