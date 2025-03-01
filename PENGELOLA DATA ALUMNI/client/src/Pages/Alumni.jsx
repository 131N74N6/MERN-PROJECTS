import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./Alumni.css";

export default function Alumni() {
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        async function getData() {
            try {
                const fecthing = await fetch(`http://localhost:3500/alumni/${id}`);
                const response = await fecthing.json();
                const data = response;
                setData(data);
            }
            catch(error) {
                setError(error);
            }
        }
        getData();
    }, []);

    const deleteData = (id) => {
        fetch(`http://localhost:3500/hapus/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(input),
        })
        .then((response) => {
            location.reload();
            return response.json();
        })
        .catch((error) => console.log(error));
    }

    return (
        <div className="alumni">
            {error ? <div>{error}</div> :
                data.map((d, index) => (
                    <div key={index} className="card">
                        <div>Nama : {d.nama}</div>
                        <div>Alamat : {d.alamat}</div>
                        <div>Jurusan/Prodi : {d.jurusan_prodi}</div>
                        <div>Jenis Kelamin : {d.jenis_kelamin}</div>
                        <div>Tahun Lulus : {d.tahun_lulus}</div>
                        <div className="controls">
                            <Link to={"/"}>Kembali</Link>
                            <Link to={`/edit-data/${d.id}`}>Ubah</Link>
                            <button type="button" onClick={() => deleteData(d.id)}>Hapus</button>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}
