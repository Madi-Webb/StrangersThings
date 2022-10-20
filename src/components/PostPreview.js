import React from "react";
import { useOutletContext } from "react-router-dom"; 

const PostPreview = (props) => {
    const postData = props;
    // console.log("individual post: ", postData);

    return (
        <div className="post-preview">
            <h2>{postData.post.title}</h2>
            <p>{postData.post.description}</p>
            <p><strong>Price: </strong>{postData.post.price}</p>
            <p><strong>Seller: </strong>{postData.post.author.username}</p>
            <p><strong>Location: </strong>{postData.post.location}</p>
            <button className="send-msg-btn">Send message</button>
        </div>
    )
};

export default PostPreview; 