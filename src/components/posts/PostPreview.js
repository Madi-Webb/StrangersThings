import { Link } from "react-router-dom"; 

const PostPreview = ({ postData }) => {
    // console.log(postData);


    return (
        <div className="post-preview">
            <div className="post-title">{postData.title}</div>
            <p>{postData.description}</p>
            <div className="horiz-separated-container">
                <p><strong>Location: </strong>{postData.location}</p>
                <p><strong>Willing to Deliver? </strong>{postData.willDeliver ? ("Yes") : ("No")}</p>
                <p><strong>Seller: </strong>{postData.author.username}</p>
            </div>


            <div className="bottom-container">
                <div className="price"><strong>{postData.price}</strong></div>
                <button className="details-btn"><Link to={`/posts/${postData._id}`} className='details-link'>More Details</Link></button>
            </div>
        </div>
    )
};

export default PostPreview; 