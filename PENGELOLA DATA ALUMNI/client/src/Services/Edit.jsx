import { useEffect, useState } from "react";
import Form from "../Components/Form";
import { useNavigate, useParams } from "react-router-dom";

export default function Edit() {
    const { id } = useParams();
    const [input, setInput] = useState({
        nama: "", alamat: "", jurusan_prodi: "", jenis_kelamin: "", tahun_lulus: ""
    });
    const navigate = useNavigate();
    
    useEffect(() => {
        async function getData() {
            try {
                const fecthing = await fetch(`http://localhost:3500/alumni/${id}`);
                const response = await fecthing.json();
                const dbData = response;
                setInput({ 
                    nama: dbData[0].nama, alamat: dbData[0].alamat, jurusan_prodi: dbData[0].jurusan_prodi, 
                    jenis_kelamin: dbData[0].jenis_kelamin, tahun_lulus: dbData[0].tahun_lulus
                });
            }
            catch(error) {
                setError(error);
            }
        }
        getData();
    }, []);

    const handleInput = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInput((inp) => { return { ...inp, [name]: value } });
    }

    const editData = (event) => {
        event.preventDefault();
        const req1 = input.nama.trim() !== "";
        const req2 = input.alamat.trim() !== "";
        const req3 = input.jurusan_prodi.trim() !== "";
        const req4 = !isNaN(input.tahun_lulus) && Number(input.tahun_lulus) > 0;  
        const req5 = input.jenis_kelamin === "Laki-Laki" || input.jenis_kelamin === "Perempuan";

        if (req1 && req2 && req3 && req4 && req5) {
            fetch(`http://localhost:3500/edit-data/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(input),
            })
            .then((response) => {
                return response.json();
            })
            .catch((error) => console.log(error));
        }
        else {
            alert("Data yang anda masukkan tidak valid");
        }

        navigate("/");
        setInput({ nama: "", alamat: "", jurusan_prodi: "", jenis_kelamin: "", tahun_lulus: "" });
    }

    return (
        <div>
            <Form 
                inputNama={handleInput} nama={input.nama}
                inputAlamat={handleInput} alamat={input.alamat}
                inputJenisKelamin={handleInput} jenisKelamin={input.jenis_kelamin}
                inputProdi={handleInput} prodi={input.jurusan_prodi}
                inputTahunLulus={handleInput} tahunLulus={input.tahun_lulus}
                aksi={editData} namaAksi={"Ubah"} judulField={"Ubah Data Alumni"}
            />
        </div>
    )
}
