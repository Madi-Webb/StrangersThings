import React from "react";
import { useOutletContext, Link } from "react-router-dom"; 

const Message = (props) => {
    const msgData = props;
    // console.log("individual post: ", postData);

    return (
        <div className="post-preview">
            <h1>Message</h1>
            <h2>{msgData}</h2>
            {/* <p>{msgData.post.description}</p> */}
        </div>
    )
};

export default Message; 