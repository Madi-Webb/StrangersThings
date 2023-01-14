import { useState } from "react";
import { useOutletContext, Link } from "react-router-dom";

import { ImSearch } from 'react-icons/im';

import PostPreview from "./PostPreview";

const AllPosts = () => {

    const { posts, loggedIn } = useOutletContext();
    const [ searchTerm, setSearchTerm ] = useState("");


    function postMatches(post, text) {
        if (post.title.toLowerCase().includes(text.toLowerCase())) return true;
        if (post.description.toLowerCase().includes(text.toLowerCase())) return true;
        if (post.author.username.toLowerCase().includes(text.toLowerCase())) return true;
        if (post.location.toLowerCase().includes(text.toLowerCase())) return true;
        if (post.price.toLowerCase().includes(text.toLowerCase())) return true;
        else return false;
    }

    const filteredPosts = posts.filter(post => postMatches(post, searchTerm));
    const postsToDisplay = searchTerm.length ? filteredPosts : posts;


    return (
        <div className="vert-center-container">
            <div className="posts-page-container">
                <div className="posts-header">
                    <h1>Posts</h1>
                    <form className="search-form">
                        <div className="input-container">
                            <ImSearch className="search-icon"/>
                            <input type="text" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)}></input>
                        </div>
                    </form>
                    { loggedIn ? <button className="new-post-btn"><Link to="/posts/add" className="new-post-link">New Post</Link></button> : null }
                </div>

                <div className="posts-box">
                {
                    postsToDisplay.length ? postsToDisplay.map((post, idx) => {
                        return <PostPreview key={idx} postData={post}/>
                    }) : <div className="no-posts-msg">Sorry, no posts to display</div>
                }
                </div>
            </div>
        </div>
    )
};

export default AllPosts;