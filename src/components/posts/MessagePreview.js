
const MessagePreview = ({message}) => {
    // console.log(message);

    return (
        <div className="vert-center-container">
            <div className="message-preview">
                <div className="message-sender">@{message.fromUser.username}</div>
                <div className="message-content">{message.content}</div>
            </div>
        </div>
    )
};

export default MessagePreview; 