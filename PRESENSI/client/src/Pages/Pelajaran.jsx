import { useQuery } from "@tanstack/react-query";
import BackButton from "../Components/Back-Button";
import Header from "../Components/Header";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Pelajaran() {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate("/sign-in");
        }
    }, [token]);

    const { data: pelajaran, isLoading, error } = useQuery({
        queryKey: ["pelajaran"],
        queryFn: async () => {
            const request = await fetch(`http://localhost:3555/user/schedule`, {
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
        <section>
            <Header/>
            <main className="h-screen grid grid-cols-3 grid-rows-3">
                {isLoading ? <p>Loading...</p> : error ? <p>{error.message}</p> :
                    pelajaran?.data?.map((plj, index) => (
                    <section key={index} className="border-2 p-4 border-black">
                        <div>Pelajaran : {plj.nama_pelajaran}</div>
                        <div>Jam : {plj.jam_mulai} - {plj.jam_selesai}</div>
                    </section>
                ))}
            </main>
            <BackButton/>
        </section>
    )
}
