import React, {useEffect, useState} from "react";
import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";

const Homepage = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        async function fetchThingsData() {
            try {
                const response = await fetch('https://strangers-things.herokuapp.com/api/2209-FTB-MT-WEB-FT/posts');
                const results = await response.json();
                // console.log(results);
                setPosts(results.data.posts);
            } catch (error) {
                console.log(error);
            }
        }
        fetchThingsData();

    }, [])

    return (
        <div>
            <div className="header">
                <h1 className="title">Stranger's Things</h1>
                <Navbar />
            </div>


            <Outlet context={posts}/>

        </div>

    )
}

export default Homepage;