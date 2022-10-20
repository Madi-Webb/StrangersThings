import React from "react";
import { useOutletContext } from "react-router-dom"; 

const ProfilePostPreview = (props) => {
    const postData = props;
    console.log("individual post: ", postData);

    return (
        <div className="post-preview">
            <h2>{postData.post.title}</h2>
            <p>{postData.post.description}</p>
            <p><strong>Price: </strong>{postData.post.price}</p>
            <p><strong>Location: </strong>{postData.post.location}</p>
            <button>Delete</button>
        </div>
    )
};

export default ProfilePostPreview; 