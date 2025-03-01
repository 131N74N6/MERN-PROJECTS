import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback, useRef, useState } from "react";
import Form from "../Components/Form";
import Swal from "sweetalert";

export default function Add() {
    const queryClient = useQueryClient();
    const imageRef = useRef(); 

    const [inputData, setInputData] = useState({ nama: "", alamat: "", jenis_kelamin: "", foto: "" });
    const [imageFile, setImageFile] = useState("");

    const setPreview = () => {
        imageRef.current.click();
    }

    const handleInput = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputData((input) => { return { ...input, [name]: value } });
    }

    const addMutation = useMutation({
        mutationFn: async (insertedData) => {
            const formData = new FormData();
            formData.append("nama", insertedData.nama);
            formData.append("alamat", insertedData.alamat);
            formData.append("jenis_kelamin", insertedData.jenis_kelamin);
            formData.append("foto", insertedData.foto);

            const request = await fetch(`http://localhost:3601/users-data/add-data`, {
                method: "POST",
                body: formData
            });
            if (request.ok) {
                const response = await request.json();
                return response;
            }
            else {
                throw new Error("gagal memasukkan data karena koneksi internet terputus");
            }
        },
        onSuccess: () => { queryClient.invalidateQueries(["user-data"]) }
    });

    const showImages = (event) => {
        const file = event.target.files[0]; 

        if (file) {
            const reader = new FileReader(); 
            reader.onloadend = () => { setImageFile(reader.result); };
            reader.readAsDataURL(file); 
            setInputData((prev) => ({ ...prev, foto: file })); 
        }
    }

    const submitData = useCallback( async (event) => {
        event.preventDefault();

        if (inputData.nama.trim() === "" || inputData.alamat.trim() === "" || !inputData.jenis_kelamin || !inputData.foto) {
            Swal("", "Maaf, ada yang belum lengkap", "error");
            return;
        }

        addMutation.mutate(inputData);
        setInputData({ nama: "", alamat: "", jenis_kelamin: "", foto: "" });
        setImageFile("");
    }, [inputData, imageFile]);

    return (
        <div className="insert-section">
            <Form 
                nama={inputData.nama} alamat={inputData.alamat} inputJenisKelamin={handleInput} 
                inputNama={handleInput} inputAlamat={handleInput} action={submitData} 
                inputGambar={showImages} refr={imageRef} previewGambar={setPreview} 
                profile={imageFile} jenisKelamin={inputData.jenis_kelamin} namaAksi={"Add"}
            />
        </div>
    )
}
