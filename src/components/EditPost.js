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
            console.log("HandledEditPost translated data ", data);

            const userData = await fetch(
                "https://strangers-things.herokuapp.com/api/2209-ftb-mt-web-ft/users/me",
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    },
                })
            const translatedUserData = await userData.json();
            console.log("translated user data: ", translatedUserData);
            props.setProfileData(translatedUserData.data);

            // props.setProfileData([...translatedEditPosts.data.posts]);
            // props.handleToggleEditForm();
            navigate("/profile");

        } catch(error) {
            console.log(error);
        }
    }



    return (
        <div>
            <h1>EDIT POST PAGE!</h1>
            <form onSubmit={handleEditPost}>
                <label>Edit Title</label>
                <input type="text" value={title} onChange={(event) => setTitle(event.target.value)}></input>
                <br />

                <label>Edit Description</label>
                <input type="text" value={description} onChange={(event) => setDescription(event.target.value)}></input>
                <br />

                <label>Edit Price</label>
                <input type="text" value={price} onChange={(event) => setPrice(event.target.value)}></input>
                <br />

                <label>Edit Location</label>
                <input type="text" value={location} onChange={(event) => setLocation(event.target.value)}></input>
                <br />

                <label>Edit Willingness to Deliver</label>
                <input type="checkbox" value={willDeliver} onChange={(event) => setWillDeliver(event.target.value)}></input>
                <br />

                <button type="submit">Submit</button>
            </form>
        </div>
    )

}

export default EditPost;