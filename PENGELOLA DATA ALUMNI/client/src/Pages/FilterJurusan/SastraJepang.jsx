import { useEffect, useState } from "react";
import Table from "../../Components/Table";
import Header from "../../Components/Header";
import Pagination from "../../Components/Pagination";
import deleteData from "../../Services/deleteData";

export default function SastraJepang() {
    const [data, setData] = useState([]);
    const [error, setError] = useState("");
    const [page, setPage] = useState(1);

    useEffect(() => {
        async function getData() {
            try {
                const fecthing = await fetch(`http://localhost:3500/alumni-sastra-jepang/?page=${page}`);
                if (fecthing.ok) {
                    const response = await fecthing.json();
                    const dbData = response;
                    setData(dbData);
                }
                else {
                    setError("cek koneksi anda");
                }
            }
            catch(error) {
                setError(error);
            }
        }
        getData();
    }, [page]);

    return (
        <div className="home">
            <Header/>
            <div className="content-wrap">
                <div className="content">
                    {!error ? <Table data={data.data} deleteData={deleteData}/> : <div>{error}</div>}
                </div>
                <Pagination currentPage={page} lastPage={data.totalPages} setPage={setPage}/>
            </div>
        </div>
    )
}
