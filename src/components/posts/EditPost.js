import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

import { AiFillDelete } from 'react-icons/ai';

import { editPostFetch, deletePostFetch, fetchAllPosts } from '../../api/posts';

const EditPost = ({ detailedPost, setDetailedPost, handleToggleEditForm }) => {

    const { setPosts } = useOutletContext();

    const [title, setTitle] = useState(detailedPost.title);
    const [description, setDescription] = useState(detailedPost.description);
    const [price, setPrice] = useState(detailedPost.price);
    const [location, setLocation] = useState(detailedPost.location);
    const [willDeliver, setWillDeliver] = useState(detailedPost.willDeliver);

    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();


    async function editPostFormSubmitHandler(event) {
        event.preventDefault();
        const editPostFetchData = await editPostFetch(detailedPost._id, title, description, price, location, willDeliver);

        if (editPostFetchData.success) {
            const allPostsFetchData = await fetchAllPosts();
            if (allPostsFetchData.success) {
                setPosts(allPostsFetchData.data.posts);
                setDetailedPost(editPostFetchData.data.post);
                handleToggleEditForm();
            } 

        } else {
            console.log(editPostFetchData.error);
            setErrorMessage(editPostFetchData.error);
        }
    }


    async function deleteButtonHandler(event) {
        event.preventDefault();
        const deletePostFetchData = await deletePostFetch(props.detailedPost._id);

        if (deletePostFetchData.success) {
            const allPostsFetchData = await fetchAllPosts();
            if (allPostsFetchData.success) {
                setPosts(allPostsFetchData.data.posts);
                navigate('/posts');
            } 
        } else {
            console.log(deletePostFetchData.error);
            setErrorMessage(deletePostFetchData.error);
        }
    }


    return (
        <div className='vert-center-container'>
            <form className="new-post-form" onSubmit={editPostFormSubmitHandler}>
                <label>Edit Title:</label>
                <input type="text" className='title-input' value={title} onChange={(event) => setTitle(event.target.value)}></input>
                <br />

                <label>Edit Description:</label>
                <textarea type="text" className="description-input" value={description} onChange={(event) => setDescription(event.target.value)}></textarea>
                <br />

                <label>Edit Price:</label>
                <input type="text" value={price} onChange={(event) => setPrice(event.target.value)}></input>
                <br />

                <label>Edit Location:</label>
                <input type="text" value={location} onChange={(event) => setLocation(event.target.value)}></input>
                <br />

                <label className='delivery-input'>Edit Willingness to Deliver: {"("}Check for yes{")"}
                    <input type="checkbox" value={willDeliver} onChange={(event) => setWillDeliver(event.target.checked)} defaultChecked={willDeliver}></input>
                    <span className='checkmark'></span>
                </label>
                
                <br />

                <div className="edit-buttons-container">
                    <button className="button-container delete-button"  onClick={(event) => deleteButtonHandler(event)}><AiFillDelete />DELETE</button>
                    <button type="submit" className="save-post-button">Save Post</button>
                </div>
            </form>
        </div>
    )
};

export default EditPost;