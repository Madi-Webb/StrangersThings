import { useNavigate } from "react-router-dom";

import { IoFlashlightSharp } from 'react-icons/io5';

import Logo from "./Logo";

const Home = () => {

    const navigate = useNavigate();


    return (
        <div className="vert-center-container">
            <div className="homepage-welcome">Welcome to</div>
            <Logo />
            <div className="homepage-link">
                <div className="homepage-question" onClick={() => navigate("/posts")}>What are you looking for?</div>
                <IoFlashlightSharp className='flashlight-icon'/>
            </div>
        </div>
    )
};

export default Home;