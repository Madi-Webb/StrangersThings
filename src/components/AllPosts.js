import React from "react";
import { useOutletContext } from "react-router-dom";
import { Link } from "react-router-dom"; 


import PostPreview from "./PostPreview";

const AllPosts = () => {
    const postsData = useOutletContext();
    console.log("This is our postsData: ", postsData);

    return (
        <div>
            <div className="posts-header">
                <h1>Posts</h1>
                <p>Search Posts</p>
                <button><Link to="/posts/add">New Post</Link></button>
            </div>

            {
                postsData.length ? postsData.map((post, idx) => {
                    return <PostPreview key={idx} post={post}/>
                }) : <p>No posts to display</p>
            }
        </div>
    )

}

export default AllPosts;