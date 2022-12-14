import React from "react";
import { Link } from "react-router-dom"; 

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
            <div className="button-container">
                <button className="see-more-btn"><Link to={`/posts/${postData.post._id}`}>More Details</Link></button>
            </div>
        </div>
    )
};

export default PostPreview; 