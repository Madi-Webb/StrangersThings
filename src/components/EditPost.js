import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const EditPost = (props) => {
    const [title, setTitle] = useState(props.indivPost.title);
    const [description, setDescription] = useState(props.indivPost.description);
    const [price, setPrice] = useState(props.indivPost.price);
    const [location, setLocation] = useState(props.indivPost.location);
    const [willDeliver, setWillDeliver] = useState(props.indivPost.willDeliver);

    const navigate = useNavigate();

    async function handleEditPost(event) {
        event.preventDefault();
        try {
            const response = await fetch(`http://strangers-things.herokuapp.com/api/2209-ftb-mt-web-ft/posts/${props.indivPost._id}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    post: {
                        title: title,
                        description: description,
                        price: price,
                        location: location,
                        willDeliver: willDeliver
                    }
                })
            })
            const data = await response.json();
            // console.log("HandledEditPost translated data ", data);

            const userData = await fetch(
                "https://strangers-things.herokuapp.com/api/2209-ftb-mt-web-ft/users/me",
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    },
                })
            const translatedUserData = await userData.json();
            props.setProfileData(translatedUserData.data);
            navigate("/profile");

        } catch(error) {
            console.log(error);
        }
    }


    return (
        <div className="new-post">
            <h2>Editing Post...</h2>
            <form className="new-post-form" onSubmit={handleEditPost}>
                <label>Edit Title</label>
                <input type="text" value={title} onChange={(event) => setTitle(event.target.value)}></input>
                <br />

                <label>Edit Description</label>
                <textarea type="text" value={description} onChange={(event) => setDescription(event.target.value)}></textarea>
                <br />

                <label>Edit Price</label>
                <input type="text" value={price} onChange={(event) => setPrice(event.target.value)}></input>
                <br />

                <label>Edit Location</label>
                <input type="text" value={location} onChange={(event) => setLocation(event.target.value)}></input>
                <br />

                <label>Edit Willingness to Deliver</label>
                <input type="checkbox" value={willDeliver} onChange={(event) => setWillDeliver(event.target.value)} defaultChecked={willDeliver}></input>
                <br />

                <button type="submit">Submit</button>
            </form>
        </div>
    )

}

export default EditPost;