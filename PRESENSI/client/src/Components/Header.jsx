import { useNavigate } from "react-router-dom";

export default function Header() {
    const navigate = useNavigate();

    const logOut = () => {
        navigate("/");
    }
    
    return (
        <header className="sticky top-0 z-50 bg-green-800 p-4 w-screen">
            <nav>
                <button type="button" className="bg-transparent text-md text-white cursor-pointer" onClick={logOut}>Log Out</button>
            </nav>
        </header>
    )
}
