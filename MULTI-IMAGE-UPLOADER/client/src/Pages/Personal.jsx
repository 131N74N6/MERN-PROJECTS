import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Loading from "../Components/Loading";
import Post from "../Components/Post";
import Header from "../Components/Header";
import "./Personal.css";

const Personal = () => {
    const queryQlient = useQueryClient();
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!token) {
            navigate("/sign-in");
        }
    }, [navigate]);

    const { data: postingan, isLoading: postIsLoad, error } = useQuery({
        queryKey: ["postingan"],
        queryFn: async () => {
            const request = await fetch(`http://localhost:3602/user-post/`, {
                method: "GET", headers: {"Authorization":  `Bearer ${token}`} 
            });
            if (request.ok) {
                const response = await request.json();
                return response;
            }
            else {
                throw new Error("GAGAL MEMUAT POSTINGAN");
            }
        },
        staleTime: 4000,
        cacheTime: 300000
    });

    const removeAllMutation = useMutation({
        mutationFn: async () => {
            const request = await fetch(`http://localhost:3602/user-post/delete-all`, { 
                method: "DELETE"
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

    const deleteAllPost = async () => {
        removeAllMutation.mutate();
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/sign-in');
    }

    return (
        <div className="home-content">
            <div className="feature">
                <img/>
                <div>{postingan?.data[0]?.nama}</div>
                <input type="checkbox" name="bar" id="bar"/>
                <label htmlFor="bar"><i className="fa-solid fa-bars-staggered"></i></label>
                <nav>
                    <button type="button" onClick={deleteAllPost}>Hapus Semua Postingan</button>
                    <button type="button" onClick={handleLogout}>Log Out</button>
                </nav>
            </div>
            <div className="post-display">
                {error ? <p>{error.message}</p> : postIsLoad ? <Loading/> : 
                    postingan?.data?.map((post, index) => (
                        post.caption !== null ?
                        <Post key={`user-post-${index}`} data={post} route={`/personal/${post.id}`}/> :
                        <div className="message">Akun ini belum memposting apapun</div>
                    ))
                }
            </div>
            <Header/>
        </div>
    )
}

export default Personal;