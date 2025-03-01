import { Link } from "react-router-dom";
import "./Header.css";

export default function Header() {
    return (
        <div>
            <header className="header-1">
                <Link to={"/insert-data"}>Tambah +</Link>
                <Link to={"/"}>Home</Link>
                <Link to={"/alumni-akuntansi"}>Akuntansi</Link>
                <Link to={"/alumni-manajemen"}>Manajemen</Link>
                <Link to={"/alumni-pai"}>Pendidikan Agama Islam</Link>
                <Link to={"/alumni-ppkn"}>PPKn</Link>
                <Link to={"/alumni-elektro"}>Teknik Elektro</Link>
                <Link to={"/alumni-informatika"}>Teknik Informatika</Link>
                <Link to={"/alumni-mesin"}>Teknik Mesin</Link>
                <Link to={"/alumni-sastra-jepang"}>Sastra Jepang</Link>
                <Link to={"/alumni-sastra-korea"}>Sastra Korea</Link>
                <Link to={"/alumni-sastra-prancis"}>Sastra Prancis</Link>
            </header>
            <header className="header-2">
                <div className="header-2-content">
                    <label htmlFor="open-sidebar">
                        <i className="fa-solid fa-bars"></i>
                    </label>
                    <input type="checkbox" id="open-sidebar"/>
                    <div className="sidebar">
                        <Link to={"/insert-data"}>Tambah +</Link>
                        <Link to={"/"}>Home</Link>
                        <Link to={"/alumni-akuntansi"}>Akuntansi</Link>
                        <Link to={"/alumni-manajemen"}>Manajemen</Link>
                        <Link to={"/alumni-pai"}>Pendidikan Agama Islam</Link>
                        <Link to={"/alumni-ppkn"}>PPKn</Link>
                        <Link to={"/alumni-elektro"}>Teknik Elektro</Link>
                        <Link to={"/alumni-informatika"}>Teknik Informatika</Link>
                        <Link to={"/alumni-mesin"}>Teknik Mesin</Link>
                        <Link to={"/alumni-sastra-jepang"}>Sastra Jepang</Link>
                        <Link to={"/alumni-sastra-korea"}>Sastra Korea</Link>
                        <Link to={"/alumni-sastra-prancis"}>Sastra Prancis</Link>
                    </div>
                </div>
            </header>
        </div>
    )
}
