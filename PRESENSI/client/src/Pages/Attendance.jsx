import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import BackButton from "../Components/Back-Button";

export default function Attendance() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const date = new Date;
    const formattedDate = date.toISOString();
    const [presensi, setPresensi] = useState({ hariTanggal: formattedDate.slice(0,10), status_kehadiran: "Hadir" });

    useEffect(() => {
        if (!token) {
            navigate("/sign-in");
        }
    }, [token]);
    
    const selectStatus = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setPresensi((prev) => ({ ...prev, [name]: value }));
    }

    const mutationAttendance = useMutation({
        mutationFn: async () => {
            const request = await fetch(`http://localhost:3555/attendance/fill-attendance`, { 
                method: "POST", 
                headers: { "Authorization": `Bearer ${token}` },
                body: JSON.stringify(presensi)
            });
            if (request.ok) {
                const response = await request.json();
                return response;
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["presensi-user"]);
        },
        onError: (error) => {
            console.log(error.response?.data?.msg || error.message);
        }
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        mutationAttendance.mutate();
    }

    return (
        <>
            <Header/>
            <section className="bg-white p-0">
                <main className="p-4 flex justify-center gap-3.5 h-screen">
                    <form onSubmit={handleSubmit} className="shadow-[0_0_6px_rgba(0,0,0,0.323)] h-42 p-3 flex gap-4 rounded-2xl flex-col w-xs">
                        <input type="date" name="hariTanggal" id="hariTanggal" value={presensi.hariTanggal} onChange={selectStatus}/>
                        <select onChange={selectStatus} name="status_kehadiran" id="status_kehadiran" value={presensi.status_kehadiran} className="p-3 outline-0">
                            <option value={"Hadir"}>Hadir</option>
                            <option value={"Tidak Hadir"}>Tidak Hadir</option>
                            <option value={"Sakit"}>Sakit</option>
                            <option value={"Izin"}>Izin</option>
                        </select>
                        <button type="submit" className="text-md p-2 rounded-lg cursor-pointer bg-green-700 text-white" disabled={mutationAttendance.isPending}>
                            {mutationAttendance.isPending ? "Proses..." : "Kirim Presensi"}
                        </button>
                    </form>
                </main>
                <BackButton/>
            </section>
        </>
    )
}
