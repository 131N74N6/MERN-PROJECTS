import { useCallback, useState } from "react";
import { useMutation, useQuery, useQueryClient } from  "@tanstack/react-query";
import ListField from "../Components/ListField";
import Notification from "../Components/Notification";
import ErrorPage from "./ErrorPage";
import "../Styles/ToDoList.css";
import "../Styles/App.css";
import Loading from "../Components/Loading";

export default function ToDoList() {
    const queryClient = useQueryClient();
    const [data, setData] = useState({ nama_aktivitas: "", kategori_id: "" });
    const [activeCard, setActiveCard] = useState(0);
    const [message, setMessage] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const { data: list, isLoading, error } = useQuery({
        queryKey: ["activity-list"],
        queryFn: async () => {
            const request = await fetch(`http://localhost:3600/`, { method: "GET" });
            if (!request.ok) {
                throw new Error("GAGAL MENDAPATKAN DATA KARENA KONEKSI INTERNET TERPUTUS/TIDAK STABIL");
            }
            else {
                const response = await request.json();
                return response;
            }
        }
    });
    
    const handleActiveCard = useCallback((id) => {
        setActiveCard(id);
    }, []); // di ubah

    const mutationSubmit = useMutation({
        mutationFn: async (insertedData) => {
            const request = await fetch(`http://localhost:3600/insert-data`, { 
                method: "POST" ,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(insertedData)
            });

            if (!request.ok) {
                throw new Error("GAGAL MEMASUKKAN DATA KARENA KONEKSI INTERNET TERPUTUS/TIDAK STABIL");
            }
            else {
                const response = await request.json();
                return response;
            }
        },
        onSuccess: () => { queryClient.invalidateQueries(["activity-list"]) }
    });

    const mutationEdit = useMutation({
        mutationFn: async (kategoriBaru) => {
            const request = await fetch(`http://localhost:3600/change/${activeCard}`, { 
                method: "PUT" ,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(kategoriBaru)
            });
    
            if (!request.ok) {
                throw new Error("GAGAL MEMASUKKAN DATA KARENA KONEKSI INTERNET TERPUTUS/TIDAK STABIL");
            }
            else {
                const response = await request.json();
                return response;
            }
        },
        onSuccess: () => { queryClient.invalidateQueries(["activity-list"]) }
    });

    const mutationDelete = useMutation({
        mutationFn: async (id) => {
            const request = await fetch(`http://localhost:3600/remove/${id}`, { 
                method: "DELETE" ,
                headers: { "Content-Type": "application/json" },
            });
    
            if (!request.ok) {
                throw new Error("GAGAL MENGHAPUS DATA KARENA KONEKSI INTERNET TERPUTUS/TIDAK STABIL");
            }
            else {
                const response = await request.json();
                return response;
            }
        },
        onSuccess: () => { queryClient.invalidateQueries(["activity-list"]) }
    });

    const mutationDeleteAll = useMutation({
        mutationFn: async () => {
            const request = await fetch(`http://localhost:3600/remove-all`, { 
                method: "DELETE" ,
                headers: { "Content-Type": "application/json" },
            });
    
            if (!request.ok) {
                throw new Error("GAGAL MENGHAPUS SEMUA DATA KARENA KONEKSI INTERNET TERPUTUS/TIDAK STABIL");
            }
            else {
                const response = await request.json();
                return response;
            }
        },
        onSuccess: () => { queryClient.invalidateQueries(["activity-list"]) }
    });

    const handleInputChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData((d) => { return { ...d, [name]: value } });
    }

    const submitNewList = useCallback( async (event) => {
        event.preventDefault();
        const require1 = data.nama_aktivitas.trim() !== "" && data.nama_aktivitas !== null && data.nama_aktivitas !== undefined;
        const require2 = data.kategori_id !== "...Pilih Kondisi..." && data.kategori_id.trim() !== "";
        const apakahAda = list.find((li) => { return li.nama_aktivitas === data.nama_aktivitas });

        if (require1 && require2) {
            if (!apakahAda) {
                mutationSubmit.mutate(data);
            }
            else {
                setMessage("list sudah ada");
                setIsOpen(true);
                setData({ nama_aktivitas: "", kategori_id: "" });
            }
        }
        else {
            setMessage("ada yang kurang. benerin dulu deh");
            setIsOpen(true);
            setData({ nama_aktivitas: "", kategori_id: "" });
        }
    }, [data, list]);

    const closeModal = () => {
        setIsOpen(false);
    }

    const deleteList = useCallback( async (id) => {
        mutationDelete.mutate(id);
    }, [list]);

    const deleteAll = useCallback( async () => {
        mutationDeleteAll.mutate();
    }, [list]);

    const handleDrag = useCallback( async (kategoriBaru) => {
        if (!activeCard) return;

        const target = list.find((li) => li.id === activeCard);
        if (!target) {
            setMessage("Item tidak ditemukan");
            setIsOpen(true);
            return;
        }

        mutationEdit.mutate({ kategori_id: kategoriBaru });
    }, [activeCard, list]);

    return (
        <div className="dnd-2-wrap">
            <div className="dnd-2-body">
                <form title="drag-drop-2">
                    <input 
                        type="text" onChange={handleInputChange} 
                        value={data.nama_aktivitas} id="enter-list" 
                        name="nama_aktivitas"
                        placeholder="masukkan aktivitas"
                    />
                    <select name="kategori_id" title="condition" onChange={handleInputChange} value={data.kategori_id}>
                        <option>...Pilih Kondisi...</option>
                        <option value="L001N">Baru</option>
                        <option value="L001D">Sedang Dilakukan</option>
                        <option value="L001C">Selesai</option>
                    </select>
                    <button type="submit" onClick={submitNewList}>Tambahkan List ➕</button>
                    <button type="button" onClick={deleteAll}>Hapus Semua 🗑️</button>
                </form>
            </div>
            <Notification open={isOpen} message={message} close={closeModal}/>
            {error ? <ErrorPage text={error}/> : isLoading ? <Loading/> :
                <ListField 
                    data={list} 
                    eraser={deleteList} 
                    activeCard={handleActiveCard} 
                    dropHandling={handleDrag} 
                    brightness={isOpen}
                />
            }
        </div>
    )
}
