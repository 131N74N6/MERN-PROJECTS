import BackButton from "../Components/Back-Button";
import Header from "../Components/Header";

export default function ListSiswa() {
    return (
        <section className="bg-white">
            <Header/>
            <main className="h-screen">
                <p>Siswa belum ditambahkan / tidak ada</p>
            </main>
            <BackButton/>
        </section>
    )
}
