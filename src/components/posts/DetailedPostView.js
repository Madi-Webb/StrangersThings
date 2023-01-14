import { useEffect, useState } from "react";
import { useOutletContext, useParams, useNavigate } from "react-router-dom";

import { MdEditNote } from 'react-icons/md';
import { AiFillCloseCircle } from 'react-icons/ai';
import { FiMail } from 'react-icons/fi';

import EditPost from "./EditPost";
import MessageForm from "./MessageForm";
import MessagePreview from "./MessagePreview";


const DetailedPostView = () => {

    const { posts, profileData, loggedIn, setProfileData } = useOutletContext();

    const { id } = useParams();
    const [ detailedPost, setDetailedPost ] = useState();

    const [ createdDate, setCreatedDate ] = useState("");
    const [ updatedDate, setUpdatedDate ] = useState("");
    const [ updatedPost, setUpdatedPost ] = useState(false);

    const [ toggleEditForm, setToggleEditForm ] = useState(false);
    const [ toggleMessageForm, setToggleMessageForm ] = useState(false);

    const navigate = useNavigate();


    useEffect(() => {
        findSpecificPost();
    }, [detailedPost, profileData]);


    async function findSpecificPost() {
        try {
            const [specificPost] = await posts.filter((post) => post._id == id);
            setDetailedPost(specificPost);
            await convertDates();
        } catch(error) {
            console.log(error);
        }
    }


    async function convertDates() {
        let createdDateString = '';
        let updatedDateString = '';

        const createdDateObj = new Date(detailedPost.createdAt); // TODO: fix this error - Cannot read properties of undefined (reading 'createdAt') async issue with detailedPost?
        const updatedDateObj = new Date(detailedPost.updatedAt);

        createdDateString = createdDateObj.toDateString() + " (" + createdDateObj.toTimeString().slice(0, 8) + ")";
        updatedDateString = updatedDateObj.toDateString() + " ("  + updatedDateObj.toTimeString().slice(0, 8)+ ")" ;

        if (createdDateObj !== updatedDateObj) {
            setUpdatedPost(true);
            if (createdDateString === updatedDateString) {
                // updated at the exact same second doesn't count
                setUpdatedPost(false);
            }
        }

        setCreatedDate(createdDateString);
        setUpdatedDate(updatedDateString);
    }


    function handleToggleEditForm() {
        setToggleEditForm(!toggleEditForm);
    }


    function handleToggleMessageForm() {
        setToggleMessageForm(!toggleMessageForm);
    }


    return (
        <div className="vert-center-container">

            <div>
                {
                    detailedPost ?
                    <div>
                        <div className="detailed-post">
                            <div className="post-title">{detailedPost.title}</div>
                            <p className="details">{detailedPost.description}</p>
                            <div className="horiz-seperated-container">
                                <p><strong>Location: </strong>{detailedPost.location}</p>
                                <div className="date-container">
                                    <div><strong>Posted: </strong>{createdDate}</div>
                                    {
                                        updatedPost ? <div><strong>Updated: </strong>{updatedDate}</div> : null
                                    }
                                </div>


                            </div>
                            <div className="horiz-seperated-container">
                                <p><strong>Seller: </strong>{detailedPost.author.username}</p>
                                <p><strong>Willing to Deliver? </strong>{detailedPost.willDeliver ? ("Yes") : ("No")}</p>
                            </div>    
                            <div className="bottom-container">
                                <div className="price"><strong>{detailedPost.price}</strong></div>
                                { loggedIn && profileData ?
                                    ( detailedPost.author._id == profileData._id ? 
                                        <div>
                                            <button className="edit-button" onClick={handleToggleEditForm}>{
                                                !toggleEditForm ? 
                                                    <div className="icon-button-container"><MdEditNote />Edit Post</div> : <div className="icon-button-container"><AiFillCloseCircle />Close Edit Post</div>
                                            }</button>
                                        </div>
                                    :
                                        <button className="icon-button-container new-message-button" onClick={handleToggleMessageForm}>{
                                            !toggleMessageForm ? 
                                            <div className="icon-button-container"><FiMail />Message Seller</div> : <div className="icon-button-container"><AiFillCloseCircle />Close Message</div>
                                        }</button>
                                    )
                                : 
                                <div className="button-container">
                                    <button className="new-message-button" onClick={() => navigate("/profile")}>Log in to message seller</button>
                                </div>
                                }
                            </div>
                            

                        </div>

                        { toggleEditForm ? <EditPost detailedPost={detailedPost} setDetailedPost={setDetailedPost} handleToggleEditForm={handleToggleEditForm}/> : null }

                        { toggleMessageForm ? <MessageForm detailedPost={detailedPost} setProfileData={setProfileData} handleToggleMessageForm={handleToggleMessageForm} /> : null }
                        
                        <div>
                            <h3>Messages:</h3>
                            {
                                profileData ? profileData.messages.map((message, idx) => {
                                    return (message.post._id == detailedPost._id ? <MessagePreview key={idx} message={message}/> : null)
                                }) : <p>No messages to display</p>
                            }
                        </div>
                    </div>
                    : <div className="waiting-message">Searching for post...</div>
                }

            </div>
        </div>
    )
};

export default DetailedPostView;