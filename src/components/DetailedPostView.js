import { useEffect, useState } from "react";
import { useOutletContext, useParams, useNavigate } from "react-router-dom";
import EditPost from "./EditPost";
import Message from "./Message";
import MessageForm from "./MessageForm";

const DetailedPostView = () => {
    const [posts,, profileData, setProfileData, loggedIn] = useOutletContext();
    const [detailedPost, setDetailedPost] = useState({});
    const [toggleEditForm, setToggleEditForm] = useState(false);
    const [toggleMessageForm, setToggleMessageForm] = useState(false);
    const { id } = useParams();

    const navigate = useNavigate();

    function handleToggleEditForm() {
        setToggleEditForm(!toggleEditForm);
    }

    function handleToggleMessageForm() {
        setToggleMessageForm(!toggleMessageForm);
    }

    async function deletePost(event) {
        event.preventDefault();

        try {
            const response = await fetch(
                `http://strangers-things.herokuapp.com/api/2209-ftb-mt-web-ft/posts/${detailedPost._id}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                }
            )
            const data = await response.json();
            // console.log("DELETE DATA: ", data);

            const userData = await fetch(
                "https://strangers-things.herokuapp.com/api/2209-ftb-mt-web-ft/users/me",
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    },
                })
            const translatedUserData = await userData.json();
            setProfileData(translatedUserData.data);
            navigate("/profile");

        } catch(error) {
            console.log(error);
        }
    }

    async function findSpecificPost() {
        try {
            const [specificPost] = await posts.filter((element) => element._id == id);
            setDetailedPost(specificPost);
            // console.log("detailed post", specificPost);
        } catch(error) {
            console.log(error);
        }
    }

    useEffect(() => {
        findSpecificPost();
    }, []);


    return (
        <div>
            { toggleEditForm ? <EditPost indivPost={detailedPost} setProfileData={setProfileData} handleToggleEditForm={handleToggleEditForm}/> : null }

            <div>
                {
                    detailedPost.title ?
                    <div>
                        <div className="detailed-post">
                            <h2>{detailedPost.title}</h2>
                            <p>{detailedPost.description}</p>
                            <h4>Price: {detailedPost.price}</h4>
                            <h5>Location: {detailedPost.location}</h5>
                            <h5>Willing to Deliver? {detailedPost.willDeliver ? ("Yes") : ("No")}</h5>
                            
                            { loggedIn ?
                                ( detailedPost.author._id == profileData._id ? 
                                    <div className="button-container">
                                        <button className="edit-button" onClick={handleToggleEditForm}>EDIT</button>
                                        <button className="delete-button" onClick={deletePost}>DELETE</button>
                                    </div>
                                :
                                    <div className="button-container">
                                        <button className="send-msg-btn" onClick={handleToggleMessageForm}>Send Message</button>
                                    </div>
                                )
                            : 
                            <div className="button-container">
                                <button className="send-msg-btn" onClick={() => navigate("/profile")}>Log in to message seller</button>
                            </div>
                            }
                        </div>

                        { toggleMessageForm ? <MessageForm indivPost={detailedPost} handleToggleMessageForm={handleToggleMessageForm} setDetailedPost={setDetailedPost} findSpecificPost={findSpecificPost}/> : null }
                        
                        <div>
                            <h3>Messages:</h3>
                            {
                                profileData.messages.length ? profileData.messages.map((msg, idx) => {
                                    return (msg.post._id == detailedPost._id ? <Message key={idx} msg={msg}/> : null)
                                }) : <p>No messages to display</p>
                            }
                        </div>
                    </div>
                    : <p>Untitled Post</p>
                }

            </div>
        </div>
    )

}

export default DetailedPostView;