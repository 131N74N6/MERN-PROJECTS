import axios from "axios";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import InputField from "../Components/InputField";
import "./SignIn.css";
import Swal from "sweetalert2";

export default function SignIn() {
    const [identity, setIdentity] = useState({  email: "", password: "" });
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const handleInput = (event) => {
        const { name, value } = event.target;
        setIdentity((prev) => ({ ...prev, [name]: value }));
    }

    const authMutation = useMutation({
        mutationFn: () => {
            return axios.post(`http://localhost:3602/auth/sign-in`, identity);
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries(["user"]);
            setIdentity({ email: "", password: "" });
            localStorage.setItem('token', data.data.token);
            navigate("/");
        },
        onError: (error) => {
            Swal.fire({
                title: error.response?.data?.msg || 'Login gagal',
                showClass: {
                  popup: `
                    animate__animated
                    animate__fadeInUp
                    animate__faster
                  `
                },
                hideClass: {
                  popup: `
                    animate__animated
                    animate__fadeOutDown
                    animate__faster
                  `
                }
            });
        }
    });

    const handleSignIn = async (event) => {
        event.preventDefault();
        if (identity.email.trim() === "" || identity.password.trim() === "") {
            Swal.fire({
                title: "Mohon di isi dengan lengkap!",
                showClass: {
                    popup: `
                    animate__animated
                    animate__fadeInUp
                    animate__faster
                    `
                },
                hideClass: {
                    popup: `
                    animate__animated
                    animate__fadeOutDown
                    animate__faster
                    `
                }
            });
            return;
        }
        authMutation.mutate();
    }

    const toSignUp = () => navigate("/sign-up");

    return (
        <div className="signInPage">
            <form onSubmit={handleSignIn} title="Sign In">
                <h1>Hello...</h1>
                <InputField 
                    label="Email" 
                    type="email" 
                    name="email" 
                    value={identity.email} 
                    handleInput={handleInput}
                />
                <InputField 
                    label="Password" 
                    type="password" 
                    name="password" 
                    value={identity.password} 
                    handleInput={handleInput}
                />
                <div className="to-signup">Belum terdaftar ? <span onClick={toSignUp}>Sign Up</span></div>
                <button type="submit" disabled={authMutation.isPending}>
                    {authMutation.isPending ? "Proses..." : "Sign In"}
                </button>
            </form>
        </div>
    )
}
