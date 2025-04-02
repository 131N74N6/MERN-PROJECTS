import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
    const [user, setUser] = useState({ username: "", kata_sandi: "" });
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const handleInput = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setUser((prev) => ({ ...prev, [name]: value }));
    }

    const mutationSignIn = useMutation({
        mutationFn: async () => {
            const request = await fetch(`http://localhost:3555/user/sign-in`, { 
                method: "POST", 
                body: JSON.stringify(user)
            });
            if (request.ok) {
                const response = await request.json();
                return response;
            }
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries(["user-siswa"]);
            setUser({ username: "", kata_sandi: "" });
            localStorage.setItem('token', data.token); 
            navigate("/");
        },
        onError: (error) => {
            console.log(error.response?.data?.msg || error.message);
        }
    });
    
    const handleSignIn = (event) => {
        event.preventDefault();
        mutationSignIn.mutate();
    }

    return (
        <section className="h-screen flex items-center justify-center">
            <main className="shadow-[0_0_6px_rgba(0,0,0,0.323)] w-2xs md:w-xs">
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
                        <label htmlFor="kata_sandi" className="text-lg">Password</label>
                        <input 
                            placeholder="masukkan password..." type="password" id="kata_sandi" name="kata_sandi" 
                            className="border-2 border-gray-300 p-2 rounded-lg" onChange={handleInput} value={user.kata_sandi}
                        />
                    </div>
                    <button type="submit" className="bg-blue-900 text-white text-md p-2 cursor-pointer rounded-lg mt-2">Sign In</button>
                </form>
            </main>
        </section>
    )
}
