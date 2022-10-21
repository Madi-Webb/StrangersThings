import React, { useState } from "react";
import { useOutletContext, Link } from "react-router-dom";

import PostPreview from "./PostPreview";

const AllPosts = () => {
    const [postsData,,,, loggedIn] = useOutletContext();
    const [searchTerm, setSearchTerm] = useState("");

    function postMatches(post, text) {
        if (post.title.toLowerCase().includes(text.toLowerCase())) return true;
        if (post.description.toLowerCase().includes(text.toLowerCase())) return true;
        if (post.author.username.toLowerCase().includes(text.toLowerCase())) return true;
        if (post.location.toLowerCase().includes(text.toLowerCase())) return true;
        if (post.price.toLowerCase().includes(text.toLowerCase())) return true;
        else return false;
    }

    const filteredPosts = postsData.filter(post => postMatches(post, searchTerm));
    const postsToDisplay = searchTerm.length ? filteredPosts : postsData;


    return (
        <div>
            <div className="posts-header">
                <h1>All Posts</h1>
                <form>
                    <label>Search Posts</label>
                    <input type="text" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)}></input>
                </form>
                { loggedIn ? <button className="new-post-btn"><Link to="/posts/add">New Post</Link></button> : null }
            </div>

            {
                postsToDisplay.length ? postsToDisplay.map((post, idx) => {
                    return <PostPreview key={idx} post={post}/>
                }) : <p>No posts to display</p>
            }
        </div>
    )

}

export default AllPosts;