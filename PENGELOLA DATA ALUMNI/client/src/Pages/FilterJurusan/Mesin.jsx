import { useEffect, useState } from "react";
import Header from "../../Components/Header";
import Table from "../../Components/Table";
import Pagination from "../../Components/Pagination";
import deleteData from "../../Services/deleteData";

export default function Mesin() {
    const [data, setData] = useState([]);
    const [error, setError] = useState("");
    const [page, setPage] = useState(1);
  
    useEffect(() => {
        async function getData() {
            try {
                const fecthing = await fetch(`http://localhost:3500/alumni-mesin/?page=${page}`);
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
