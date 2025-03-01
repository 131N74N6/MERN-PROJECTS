import { Link, useNavigate } from "react-router-dom";
import "./Control.css";
import Swal from "sweetalert";
import { memo, useRef } from "react";

function Control({ deleteAllData }) {
    const searchRef = useRef();
    const navigate = useNavigate();

    const getSearchedData = (event) => {
        event.preventDefault();
        const keyword = searchRef.current.value;

        keyword.trim() !== "" ?
            navigate(`/search?s=${encodeURIComponent(keyword.trim())}`) :
            Swal("", "Tidak menemukan apa yang kamu cari", "error");
    }

    return (
        <div className="control">
            <Link to={"/add-data"}>Add Data</Link>
            <button type="button" onClick={deleteAllData}>Delete All</button>
            <Link to={"/"}>Home</Link>
            <form name="search-user">
                <input type="text" name="search" required ref={searchRef}/>
                <button type="submit" onClick={getSearchedData}>cari</button>
            </form>
        </div>
    )
}

export default memo(Control);