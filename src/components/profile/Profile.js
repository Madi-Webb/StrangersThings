import { useOutletContext } from "react-router-dom";

import LoginForm from "./LoginForm";
import ProfilePostPreview from "./ProfilePostPreview";
import ProfileMessagePreview from "./ProfileMessagePreview";


const Profile = () => {

    const { loggedIn, profileData } = useOutletContext();
    // console.log('profile DATA:', profileData);


    return (
        <div className="vert-center-container">
            {
                loggedIn ? 
                <div className="horiz-container">
                    <div className="vert-center-container profile-page-container profile-header">
                        <h2>Your posts</h2>
                        {
                            profileData ? profileData.posts.map((post, idx) => {
                                if (post.active) return <ProfilePostPreview key={idx} post={post}/>
                            }) : <p>No posts to display</p>
                        }
                    </div>
                    <div className="vert-center-container profile-page-container profile-header">
                        <h2>Your messages</h2>
                        {
                            profileData ? profileData.messages.map((msg, idx) => {
                                return <ProfileMessagePreview key={idx} message={msg}/>
                            }) : <p>No messages to display</p>
                        }
                    </div>
                </div>

                : <LoginForm/>
            }
        </div>
    )
};

export default Profile;