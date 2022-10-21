import React, { useState } from 'react';
import { useOutletContext, useNavigate } from "react-router-dom";


const MessageForm = (props) => {
    const [content, setContent] = useState("");
    const [posts, setPosts, , setProfileData] = useOutletContext();
    const navigate = useNavigate();


    async function messageFormSubmitHandler(event) {
        event.preventDefault();

        try {
            const response = await fetch(
                `https://strangers-things.herokuapp.com/api/2209-ftb-mt-web-ft/posts/${props.indivPost._id}/messages`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    },
                    body: JSON.stringify({
                        message: {
                            content: content
                        }
                    })
                }
            )
            const data = await response.json();
            // console.log("SEND MESSAGE DATA: ", data);

            const updatedPosts = await fetch("https://strangers-things.herokuapp.com/api/2209-ftb-mt-web-ft/posts")
            const translatedUpdatedPosts = await updatedPosts.json();
            setPosts([...translatedUpdatedPosts.data.posts]);
            props.findSpecificPost();
            props.handleToggleMessageForm();
            navigate(`/posts/${props.indivPost._id}`);
            
        } catch(error) {
            console.log(error);
        }
    }


    return (
        <div className='new-post'>

            <form onSubmit={messageFormSubmitHandler} className="new-post-form">

                <label>Message:</label>
                <textarea type="text" value={content} onChange={(event) => setContent(event.target.value)}></textarea>

                <br/>

                <button type="submit">SEND</button>
            </form>

        </div>
    )
};

export default MessageForm; 