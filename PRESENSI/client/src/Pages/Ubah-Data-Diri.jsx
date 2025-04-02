import { useState } from "react";

export default function UbahDataDiri() {
    const [user, setUser] = useState({ 
        username: "", kata_sandi: "", jenis_kelamin: "", alamat: "", nama_ayah: "", nama_ibu: "" 
    });

    const handleInput = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setUser((prev) => ({ ...prev, [name]: value }));
    }

    return (
        <section className="h-screen">
            <main>
                <form title="update-data-diri">
                    <div className="flex flex-col">
                        <label htmlFor="username" className="text-lg">Username</label>
                        <input 
                            placeholder="masukkan username..." type="text" id="username" name="username" 
                            className="border-2 border-gray-300 p-2 rounded-lg" onChange={handleInput} value={user.username}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="kata_sandi" className="text-lg">Password</label>
                        <input 
                            placeholder="masukkan password..." type="password" id="kata_sandi" name="kata_sandi" 
                            className="border-2 border-gray-300 p-2 rounded-lg" onChange={handleInput} value={user.kata_sandi}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="alamat" className="text-lg">Password</label>
                        <input 
                            placeholder="masukkan password..." type="text" id="alamat" name="alamat" 
                            className="border-2 border-gray-300 p-2 rounded-lg" onChange={handleInput} value={user.alamat}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="nama_ayah" className="text-lg">Password</label>
                        <input 
                            placeholder="masukkan password..." type="text" id="nama_ayah" name="nama_ayah" 
                            className="border-2 border-gray-300 p-2 rounded-lg" onChange={handleInput} value={user.nama_ayah}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="nama_ibu" className="text-lg">Password</label>
                        <input 
                            placeholder="masukkan password..." type="text" id="nama_ibu" name="nama_ibu" 
                            className="border-2 border-gray-300 p-2 rounded-lg" onChange={handleInput} value={user.nama_ibu}
                        />
                    </div>
                </form>
            </main>
        </section>
    )
}
