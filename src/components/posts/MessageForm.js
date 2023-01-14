import { useState } from 'react';
import { useOutletContext, useNavigate } from "react-router-dom";

import { FiSend } from 'react-icons/fi';

import { postMessageFetch } from '../../api/messages';
import { fetchAllPosts } from '../../api/posts';
import { usersMeFetch } from '../../api/users';


const MessageForm = ({ detailedPost, handleToggleMessageForm, setProfileData }) => {
    const { setPosts } = useOutletContext();

    const [content, setContent] = useState("");


    async function messageFormSubmitHandler(event) {
        event.preventDefault();

        const messageData = await postMessageFetch(detailedPost._id, content);

        if (messageData.success) {
            const userFetchData = await usersMeFetch();
            if (userFetchData._id) {
                console.log("setting profile data", userFetchData);
                await setProfileData(userFetchData.data);
                handleToggleMessageForm();
                // TODO: make messages show up automatically 
            }

        } else {
            console.log(messageData.error);
            setErrorMessage(messageData.error);
        }
    }


    return (
        <div className='vert-center-container'>
            <form onSubmit={messageFormSubmitHandler} className="new-message-form">

                <label>Message Content:</label>
                <textarea type="text" className='content-input' value={content} onChange={(event) => setContent(event.target.value)}></textarea>

                <br/>

                <button type="submit" className='icon-button-container send-message-button'><FiSend />Send Message</button>
            </form>
        </div>
    )
};

export default MessageForm;