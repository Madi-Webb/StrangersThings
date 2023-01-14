import { Link } from "react-router-dom";

const ProfileMessagePreview = ({message}) => {
    // console.log(message);

    return (
        <div className="vert-center-container">
            <div className="profile-message-preview">
                <Link to={`/posts/${message.post._id}`} className='message-title'>{message.post.title}</Link>
                <div className="message-content">{message.content}</div>
            </div>
        </div>
    )
};

export default ProfileMessagePreview; 