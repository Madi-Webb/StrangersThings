import React, { useState } from 'react';
import { useOutletContext, useNavigate } from "react-router-dom";


const NewPost = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [location, setLocation] = useState("[On Request]");
    const [willDeliver, setWillDeliver] = useState(false);

    const [, setPosts, , setProfileData] = useOutletContext();
    const navigate = useNavigate();

    async function formSubmitHandler(event) {
        event.preventDefault();

        try {
            const response = await fetch(
                "https://strangers-things.herokuapp.com/api/2209-ftb-mt-web-ft/posts",
                {
                    method: "POST",
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
                }
            )
            const data = await response.json();
            // console.log("NEW POST DATA: ", data);

            const updatedPosts = await fetch("https://strangers-things.herokuapp.com/api/2209-ftb-mt-web-ft/posts")
            const translatedUpdatedPosts = await updatedPosts.json();
            setPosts([...translatedUpdatedPosts.data.posts]);

            const updatedUser = await fetch(
                "https://strangers-things.herokuapp.com/api/2209-ftb-mt-web-ft/users/me",
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    },
                }
            )
                
            const translatedUpdatedUser = await updatedUser.json();
            setProfileData(translatedUpdatedUser.data);
            navigate("/posts");

        } catch(error) {
            console.log(error);
        }
    }


    return (
        <div className='new-post'>

            <form onSubmit={formSubmitHandler} className="new-post-form">
                <label>Title:</label>
                <input type="text" value={title} onChange={(event) => setTitle(event.target.value)}></input>

                <br/>

                <label>Description:</label>
                <textarea type="text" value={description} onChange={(event) => setDescription(event.target.value)}></textarea>

                <br/>

                <label>Price:</label>
                <input type="text" value={price} onChange={(event) => setPrice(event.target.value)}></input>

                <br/>
                
                <label>Location:</label>
                <input type="text" value={location} onChange={(event) => setLocation(event.target.value)}></input>

                <br/>

                <label>Willing to Deliver? {"("}Check for yes{")"}</label>
                <input type="checkbox" value={willDeliver} onChange={(event) => setWillDeliver(event.target.checked)}></input>

                <br/>

                <button type="submit">POST</button>
            </form>

        </div>
    )
};

export default NewPost; 