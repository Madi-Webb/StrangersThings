import { useNavigate } from "react-router-dom";

import { IoFlashlightSharp } from 'react-icons/io5'

import Header from "./Header";
import Logo from "./Logo";

const ErrorPage = () => {

    const navigate = useNavigate();


    return (
        <div className="vert-center-container">
            <Header />
            <div className="error-message">Sorry, there's nothing here...</div>
            {/* <Logo /> */}
            <div className="error-link">
                <div className="error-question" onClick={() => navigate("/posts")}>Back to searching</div>
                <IoFlashlightSharp className='flashlight-icon'/>
            </div>
        </div>
    )
};

export default ErrorPage; 