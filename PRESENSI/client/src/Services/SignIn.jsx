import { useState } from "react";

export default function SignIn() {
    const [user, setUser] = useState({ username: "", password: "" });

    const handleInput = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setUser((prev) => ({ ...prev, [name]: value }));
    }
    
    const handleSignIn = (event) => {
        event.preventDefault();
        console.log(user);
    }

    return (
        <section className="h-screen flex items-center justify-center">
            <main className="shadow-[0_0_6px_rgba(0,0,0,0.323)] w-xs @max-md:w-2xs">
                <div className="flex items-center justify-center p-4 bg-blue-400 h-24">
                    <div className="text-2xl text-white">Sign In Siswa</div>
                </div>
                <form className="p-4 flex flex-col gap-6 bg-white" title="sign-in-field" onSubmit={handleSignIn}>
                    <div className="flex flex-col">
                        <label htmlFor="username" className="text-lg">Username</label>
                        <input 
                            placeholder="masukkan username..." type="text" id="username" name="username" 
                            className="border-2 border-gray-300 p-2 rounded-lg" onChange={handleInput} value={user.username}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="password" className="text-lg">Password</label>
                        <input 
                            placeholder="masukkan password..." type="password" id="password" name="password" 
                            className="border-2 border-gray-300 p-2 rounded-lg" onChange={handleInput} value={user.password}
                        />
                    </div>
                    <button type="submit" className="bg-blue-900 text-white text-md p-2 cursor-pointer rounded-lg mt-2">Sign In</button>
                </form>
            </main>
        </section>
    )
}
