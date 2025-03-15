import { Link } from 'react-router-dom';
import "./Header.css";

const Header = () => {
    return (
        <div className="header-nav-bar">
            <nav className="navigation">
                <div><Link to={"/home"}><i className="fa-solid fa-house"></i></Link></div>
                <div><Link to={"/add"}><i className="fa-solid fa-square-plus"></i></Link></div>
                <div><Link to={"/"}><i className="fa-solid fa-user"></i></Link></div>
            </nav>
        </div>
    )
}

export default Header;