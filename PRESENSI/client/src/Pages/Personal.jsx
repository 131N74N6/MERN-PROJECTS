import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";

export default function Personal() {
    const navigate = useNavigate();

    return (
        <>
            <Header/>
            <section className="flex h-screen justify-center bg-white">
                <main className="grid grid-cols-3 grid-rows-3 p-4 gap-4">
                    <div className="text-center shadow-[0_0_6px_rgba(0,0,0,0.323)] p-4 cursor-pointer" onClick={() => navigate("/attendance")}>
                        <i className="fa-solid fa-list-check text-4xl"></i>
                        <div>Presensi</div>
                    </div>
                    <div className="text-center shadow-[0_0_6px_rgba(0,0,0,0.323)] p-4 cursor-pointer" onClick={() => navigate("/siswa")}>
                        <i className="fa-solid fa-clipboard-user text-4xl"></i>
                        <div>Daftar siswa</div>
                    </div>
                    <div className="text-center shadow-[0_0_6px_rgba(0,0,0,0.323)] p-4 cursor-pointer" onClick={() => navigate("/pelajaran")}>
                        <i className="fa-solid fa-book text-4xl"></i>
                        <div>Jadwal Pelajaran</div>
                    </div>
                </main>
            </section>
        </>
    )
}
