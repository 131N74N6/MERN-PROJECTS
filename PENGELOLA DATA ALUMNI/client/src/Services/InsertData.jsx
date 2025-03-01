import { useState } from "react";
import Form from "../Components/Form";
import { useNavigate } from "react-router-dom";

export default function InsertData() {
    const [input, setInput] = useState({
        nama: "", alamat: "", jurusan_prodi: "", jenis_kelamin: "", tahun_lulus: ""
    });
    const navigate = useNavigate();

    const handleInput = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInput((inp) => { return { ...inp, [name]: value } });
    }

    const submitData = (event) => {
        event.preventDefault();
        const req1 = input.nama.trim() !== "";
        const req2 = input.alamat.trim() !== "";
        const req3 = input.jurusan_prodi.trim() !== "";
        const req4 = !isNaN(input.tahun_lulus) && Number(input.tahun_lulus) > 0;  
        const req5 = input.jenis_kelamin === "Laki-Laki" || input.jenis_kelamin === "Perempuan";

        if (req1 && req2 && req3 && req4 && req5) {
            fetch("http://localhost:3500/insert-data", {
                method: "POST",
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
                aksi={submitData} namaAksi={"Tambah +"} judulField={"Masukkan Data Alumni"}
            />
        </div>
    )
}
