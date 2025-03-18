import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import "./Header.css";

const Header = () => {
    const [isDark, setIsDark] = useState(localStorage.getItem("dark-theme") === "yes");

    const intoDark = () => {
        document.querySelector("body").setAttribute("dark", "yes");
        localStorage.setItem("dark-theme", "yes");
    }

    const intoDefault = () => {
        document.querySelector("body").setAttribute("dark", "no");
        localStorage.setItem("dark-theme", "no");
    }

    const chosenTheme = (event) => {
        setIsDark(event.target.checked);
    }

    useEffect(() => {
        isDark ? intoDark() : intoDefault();
    }, [isDark]);

    return (
        <div className="header-nav-bar">
            <nav className="navigation">
                <div><Link to={"/home"}><i className="fa-solid fa-house"></i></Link></div>
                <div><Link to={"/"}><i className="fa-solid fa-user"></i></Link></div>
                <div><Link to={"/add"}><i className="fa-solid fa-square-plus"></i></Link></div>
                <div className="dark-mode">
                    <input 
                        type="checkbox" 
                        id="dark-theme" 
                        name="dark-theme" 
                        onChange={chosenTheme} 
                        checked={isDark}
                    />
                    <label htmlFor="dark-theme">
                        <i className="fa-solid fa-moon"></i>
                    </label>
                </div>
                <div><Link to={"/about"}><i className="fa-solid fa-gears"></i></Link></div>
            </nav>
        </div>
    )
}

export default Header;