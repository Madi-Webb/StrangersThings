import React, { useState } from 'react';

const NewPost = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [location, setLocation] = useState("");
    const [willDeliver, setWillDeliver] = useState(false);


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
            console.log("This is our translated data after NEW POST: ", data);

        } catch(error) {
            console.log(error);
        }
    }

    function updateTitleState(event) {
        setTitle(event.target.value);
    }

    function updateDescriptionState(event) {
        setDescription(event.target.value);
    }

    function updatePriceState(event) {
        setPrice(event.target.value);
    }

    function updateLocationState(event) {
        setLocation(event.target.value);
    }

    function updateWillDeliverState(event) {
        setWillDeliver(event.target.value);
    }


    return (
        <div>
            <p>New Post page!!! {":)"}</p>

            <form onSubmit={formSubmitHandler} className="login-form">
                <label>Enter Title Here</label>
                <input type="text" value={title} onChange={updateTitleState}></input>

                <br/>

                <label>Enter Description Here</label>
                <input type="text" value={description} onChange={updateDescriptionState}></input>

                <br/>

                <label>Enter Price Here</label>
                <input type="text" value={price} onChange={updatePriceState}></input>

                <br/>
                
                <label>Enter Location Here</label>
                <input type="text" value={location} onChange={updateLocationState}></input>

                <br/>

                <label>Enter Will Deliver Here</label>
                <input type="checkbox" value={willDeliver} onChange={updateWillDeliverState}></input>

                <br/>

                <button type="submit">POST</button>
            </form>

        </div>
    )
};

export default NewPost; 