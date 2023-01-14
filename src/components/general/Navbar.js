import { Link } from "react-router-dom";

import { AiOutlineHome } from 'react-icons/ai'
import { IoFlashlightSharp } from 'react-icons/io5';
import { BiUser } from 'react-icons/bi';


const Navbar = () => {

    return (
        <nav>
            <Link to="/" className="nav-link"><AiOutlineHome /><div>Home</div></Link>
            <Link to="posts" className="nav-link"><IoFlashlightSharp /><div>Posts</div></Link>
            <Link to="profile" className="nav-link"><BiUser /><div>Profile</div></Link>
        </nav>
    )
};

export default Navbar; 