import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function DataDiri() {
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate("/sign-in");
        }
    }, [token]);

    const { data: user, isLoading, error } = useQuery({
        queryKey: ["user-data"],
        queryFn: async () => {
            const request = await fetch(`http://localhost:3555/user/`, {
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
        <section className="h-screen flex justify-center">
            <main className="shadow-[0_0_6px_rgba(0,0,0,0.323)] p-4 rounded-2xl">
                {isLoading ? <p>Loading...</p> : error ? <p>{error.message}</p> :
                    user?.data?.map((u, index) => (
                    <section key={index}>
                        <div>Nama : {u.username}</div>
                        <div>Password : {u.kata_sandi}</div>
                        <div>Jenis Kelamin : {u.jenis_kelamin}</div>
                        <div>Alamat : {u.alamat}</div>
                        <div>Nama Ayah : {u.nama_ayah}</div>
                        <div>Nama Ibu : {u.nama_ibu}</div>
                    </section>
                ))}
            </main>
        </section>
    )
}
