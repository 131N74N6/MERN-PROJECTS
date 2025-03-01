import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Form from "../Components/Form";
import ErrorPage from "./ErrorPage";
import Loading from "../Components/Loading";
import Swal from "sweetalert";

export default function Edit() {
    const { id } = useParams();
    const queryClient = useQueryClient();
    const imageRef = useRef(); 
    const navigate = useNavigate();

    const { data: selected, isLoading, error } = useQuery({
        queryKey: [`user-data-${id}`],
        queryFn: async () => {
            const controller = new AbortController();
            const signal = controller.signal;
            const request = await fetch(`http://localhost:3601/users-data/select/${id}`, { method: "GET", signal });
            if (request.ok) {
                const response = await request.json();
                return response || "";
            }
            else {
                throw new Error("gagal mendapatkan data karena koneksi internet terputus");
            }
        },
        refetchOnWindowFocus: false,
        refetchInterval: false
    });

    const [inputData, setInputData] = useState({ nama: "", alamat: "", jenis_kelamin: "", foto: "" });
    const [imageFile, setImageFile] = useState("");

    function setPreview() {
        imageRef.current.click();
    }

    useEffect(() => {
        if (selected) {
            setInputData({
                nama: selected[0]?.nama || "",
                alamat: selected[0]?.alamat || "",
                jenis_kelamin: selected[0]?.jenis_kelamin || "",
                foto: selected[0]?.foto || ""
            });
        }
    }, [selected]);

    const handleInput = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputData((input) => { return { ...input, [name]: value } });
    }

    const showImages = (event) => {
        const file = event.target.files[0]; 

        if (file) {
            const reader = new FileReader(); 
            reader.onloadend = () => { setImageFile(reader.result); };
            reader.readAsDataURL(file); 
            setInputData((prev) => ({ ...prev, foto: file })); 
        }
    }
    
    const editMutation = useMutation({
        mutationFn: async (insertedData) => {
            const request = await fetch(`http://localhost:3601/users-data/change-data/${id}`, {
                method: "PUT",
                body: insertedData
            });
            if (request.ok) {
                const response = await request.json();
                return response;
            }
            else {
                throw new Error("gagal merubah data karena koneksi internet terputus");
            }
        },
        onSuccess: () => { queryClient.invalidateQueries([`user-data-${id}`]) }
    });

    const updateData = useCallback( async (event) => {
        event.preventDefault();

        if (inputData.nama.trim() === "" || inputData.alamat.trim() === "" || !inputData.jenis_kelamin) {
            Swal("", "Maaf, ada yang belum lengkap", "error");
            return;
        }

        const formData = new FormData();
        formData.append("nama", inputData.nama);
        formData.append("alamat", inputData.alamat);
        formData.append("jenis_kelamin", inputData.jenis_kelamin);

        // Jika ada file gambar baru, kirim file tersebut
        if (inputData.foto instanceof File) {
            formData.append("foto", inputData.foto);
        } 
        // Jika tidak ada file gambar baru, kirim nama file gambar lama
        else if (selected && selected[0]?.foto) {
            formData.append("foto", selected[0].foto);
        }
        else {
            Swal("", "Foto tidak valid", "error");
            return;
        }

        editMutation.mutate(formData);
        navigate("/");
        setInputData({ nama: "", alamat: "", jenis_kelamin: "", foto: "" });
        setImageFile("");
    }, [inputData, id, selected]);

    return (
        <div className="edit-section">
            {error ? <ErrorPage text={error.message} /> : isLoading ? <Loading /> : 
                selected.length === 0 ? <ErrorPage text="Data user tidak ditemukan" /> : 
                <Form 
                    nama={inputData.nama} alamat={inputData.alamat} inputJenisKelamin={handleInput} 
                    inputNama={handleInput} inputAlamat={handleInput} action={updateData} 
                    inputGambar={showImages} refr={imageRef} previewGambar={setPreview} 
                    profile={imageFile || `http://localhost:3601/uploads/${selected[0].foto}` || ""} 
                    jenisKelamin={inputData.jenis_kelamin} namaAksi={"Change"}
                />
            }
        </div>
    )
}