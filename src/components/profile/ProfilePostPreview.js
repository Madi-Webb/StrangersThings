import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; 

const ProfilePostPreview = ({ post }) => {
    // console.log("post: ", post);

    const [ createdDate, setCreatedDate ] = useState("");

    
    useEffect(() => {
        convertDates();
    }, []);


    async function convertDates() {
        let createdDateString = '';
        const createdDateObj = new Date(post.createdAt);
        createdDateString = createdDateObj.toDateString();
        setCreatedDate(createdDateString);
    }


    return (
        <div className="post-preview">
            <div className="post-title">{post.title}</div>
            <p>{post.description}</p>
            <div className="bottom-container">
                <div className="info"><strong>Posted:</strong>{createdDate}</div>
                <div className="info"><strong>Messages:</strong>{post.messages.length}</div>
                <button className="details-btn"><Link to={`/posts/${post._id}`} className='details-link'>More Details</Link></button>
            </div>
        </div>
    )
};

export default ProfilePostPreview; 