import axios from "axios";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate} from "react-router-dom";
import InputField from "../Components/InputField";
import "./SignUp.css";
import Swal from "sweetalert2";

export default function SignUp() {
    const [identity, setIdentity] = useState({ username: "", email: "", password: "" });
    const queryClient = useQueryClient();
    const navigate= useNavigate();

    const handleInput = (event) => {
        const { name, value } = event.target;
        setIdentity((prev) => ({ ...prev, [name]: value }));
    }

    const addMutation = useMutation({
        mutationFn: async () => {
            const request = await axios.post(`http://localhost:3602/auth/sign-up`, identity);
            if (request.data.status >= 400) {
                throw new Error(request.data.msg);
            }
            return request;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["user"]);
            setIdentity({ username: "", email: "", password: "" });
            navigate("/sign-in");
        },
        onError: (error) => {
            Swal.fire({
                title: error.response?.data?.msg || 'Terjadi kesalahan saat pendaftaran',
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

    const handleSignUp = async (event) => {
        event.preventDefault();
        if (identity.username.trim() === "" || identity.email.trim() === "" || identity.password.trim() === "") {
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
        addMutation.mutate();
    }

    const toSignIn = () => navigate("/sign-in");

    return (
        <div className="signUpPage">
            <form onSubmit={handleSignUp} title="Sign Up">
                <h1>Selamat Datang</h1>
                <InputField 
                    label="Username" 
                    type="text" 
                    name="username" 
                    value={identity.username} 
                    handleInput={handleInput}
                />
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
                <div className="to-signin">Sudah terdaftar ? <span onClick={toSignIn}>Sign In</span></div>
                <button type="submit" disabled={addMutation.isPending}>
                    {addMutation.isPending ? "Proses..." : "Sign Up"}
                </button>
            </form>
        </div>
    )
}
