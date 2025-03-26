import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";

export default function Personal() {
    const navigate = useNavigate();

    return (
        <>
            <Header/>
            <section className="flex h-screen justify-center bg-gray-300">
                <main className="grid grid-cols-2 sm:grid-cols-4 grid-rows-3 p-4 gap-7">
                    <div className="text-center shadow-[3px_3px_10px_gray,-3px_-3px_10px_white] p-4 cursor-pointer rounded-2xl" onClick={() => navigate("/attendance")}>
                        <i className="fa-solid fa-list-check text-4xl"></i>
                        <div>Presensi</div>
                    </div>
                    <div className="text-center shadow-[3px_3px_10px_gray,-3px_-3px_10px_white] p-4 cursor-pointer rounded-2xl" onClick={() => navigate("/siswa")}>
                        <i className="fa-solid fa-clipboard-user text-4xl"></i>
                        <div>Daftar siswa</div>
                    </div>
                    <div className="text-center shadow-[3px_3px_10px_gray,-3px_-3px_10px_white] p-4 cursor-pointer rounded-2xl" onClick={() => navigate("/pelajaran")}>
                        <i className="fa-solid fa-book text-4xl"></i>
                        <div>Jadwal Pelajaran</div>
                    </div>
                    <div className="text-center shadow-[3px_3px_10px_gray,-3px_-3px_10px_white] p-4 cursor-pointer rounded-2xl" onClick={() => navigate("/identity")}>
                        <i className="fa-regular fa-user text-4xl"></i>
                        <div>Data Diri</div>
                    </div>
                </main>
            </section>
        </>
    )
}
