import React from "react";
import { useOutletContext, Link } from "react-router-dom"; 

const ProfilePostPreview = (props) => {
    const postData = props;
    console.log("individual post: ", postData);

    return (
        <div className="post-preview">
            <h2>{postData.post.title}</h2>
            <p>{postData.post.description}</p>
            <p><strong>Price: </strong>{postData.post.price}</p>
            <p><strong>Location: </strong>{postData.post.location}</p>
            <div className="button-container">
                <button className="see-more-btn"><Link to={`/profile/${postData.post._id}`}>More Details</Link></button>
            </div>
        </div>
    )
};

export default ProfilePostPreview; 