import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Header from "../Components/Header";
import "./About.css";

const About = () => {
    const queryQlient = useQueryClient();
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!token) {
            navigate("/sign-in");
        }
    }, [navigate]);
    
    const removeAllMutation = useMutation({
        mutationFn: async () => {
            const request = await fetch(`http://localhost:3602/user-post/delete-all`, { 
                method: "DELETE",
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (request.ok) {
                const response = await request.json();
                return response;
            }
            else {
                throw new Error("GAGAL MENGHAPUS POSTINGAN");
            }
        },
        onSuccess: () => queryQlient.invalidateQueries(["postingan"]) 
    });

    const removeMutationAccount = useMutation({
        mutationFn: async () => {
            const request = await fetch(`http://localhost:3602/auth/delete-account`, { 
                method: "DELETE",
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (request.ok) {
                const response = await request.json();
                return response;
            }
            else {
                throw new Error("GAGAL MENGHAPUS AKUN");
            }
        },
        onSuccess: () => queryQlient.invalidateQueries(["user"])
    });

    const deleteAllPost = async () => {
        removeAllMutation.mutate();
        navigate('/');
    }

    const deleteAccount = async () => {
        removeMutationAccount.mutate();
        navigate('/sign-up');
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/sign-in');
    }

    return (
        <>
            <div className="account-setting">
                <section className="config-choice">
                    <button type="button" onClick={deleteAllPost}>Hapus Semua Postingan</button>
                    <button type="button" onClick={handleLogout}>Log Out</button>
                    <button type="button" onClick={deleteAccount}>Hapus Akun</button>
                </section>
            </div>
            <Header/>
        </>
    )
}

export default About;