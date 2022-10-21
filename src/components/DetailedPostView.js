import { useEffect, useState } from "react";
import { useOutletContext, useParams, useNavigate } from "react-router-dom";
import EditPost from "./EditPost";
import Message from "./Message";

const DetailedPostView = () => {
    const [posts,, profileData, setProfileData] = useOutletContext();
    const [detailedPost, setDetailedPost] = useState({});
    const [toggleEditForm, setToggleEditForm] = useState(false);
    const { id } = useParams();
    // console.log("posts", posts);
    // console.log("profileData", profileData);
    const navigate = useNavigate();

    function handleToggleEditForm() {
        setToggleEditForm(!toggleEditForm);
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
            console.log("DELETED DATA: ", data);

            const userData = await fetch(
                "https://strangers-things.herokuapp.com/api/2209-ftb-mt-web-ft/users/me",
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    },
                })
            const translatedUserData = await userData.json();
            console.log("translated user data: ", translatedUserData);
            setProfileData(translatedUserData.data);
            navigate("/profile");

        } catch(error) {
            console.log(error);
        }
    }

    useEffect(() => {
        async function findSpecificPost() {
            try {
                const [specificPost] = await posts.filter((element) => element._id == id);
                setDetailedPost(specificPost);
                console.log("detailed post", specificPost);
            } catch(error) {
                console.log(error);
            }
        }
        findSpecificPost();
    }, []);

    return (
        <div>
            { toggleEditForm ? <EditPost indivPost={detailedPost} setProfileData={setProfileData} handleToggleEditForm={handleToggleEditForm}/> : null }

            <div>
                {
                    detailedPost.title ?
                    <div>
                        <div className="detailed-post"> {/* Post Details */}
                            <h2>{detailedPost.title}</h2>
                            <p>{detailedPost.description}</p>
                            <h4>Price: {detailedPost.price}</h4>
                            <h5>Location: {detailedPost.location}</h5>
                            <h5>Willing to Deliver? {detailedPost.willDeliver ? ("Yes") : ("No")}</h5>
                            { detailedPost.author._id == profileData._id ? 
                                <div className="button-container">
                                    <button className="edit-button" onClick={handleToggleEditForm}>EDIT</button>
                                    <button className="delete-button" onClick={deletePost}>DELETE</button>
                                </div>
                            :
                                <div className="button-container">
                                    <button className="send-msg-btn" onClick={() => console.log("clicked")}>Send Message</button>
                                </div>
                            }
                        </div>
                        
                        <div>
                            <h3>Messages:</h3> {/* Post Messages */}
                            {
                                detailedPost.messages.length ? detailedPost.messages.map((msg, idx) => {
                                    return <Message key={idx} msg={msg} />
                                }) : <p>This post has no messages</p>
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