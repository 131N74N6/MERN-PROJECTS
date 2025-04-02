import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../Components/Back-Button";
import Header from "../Components/Header";

export default function ListSiswa() {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate("/sign-in");
        }
    }, [token]);

    const { data: listSiswa, isLoading, error } = useQuery({
        queryKey: ["listSiswa"],
        queryFn: async () => {
            const request = await fetch(`http://localhost:3555/user/list-student`, {
                method: "GET",
                headers: { "Authorization": `Bearer ${token}` }
            });
            if (request.ok) {
                const response = request.json();
                return response;
            }
            else {
                throw new Error("GAGAL MENAMPILKAN DATA. PERIKSA KONEKSI INTERNET");
            }
        },
        staleTime: 4000,
        cacheTime: 300000
    });

    return (
        <>
            <Header/>
            <section className="h-screen bg-white">
                {isLoading ? <p>Loading...</p> : error ? <p>{error.message}</p> :
                    listSiswa?.data?.map((siswa, index) => (
                    <main key={index}>
                        <div>Nama : {siswa.username}</div>
                        <div>Password : {siswa.nama_kelas}</div>
                    </main>
                ))}
            </section>
            <BackButton/>
        </>
    )
}
