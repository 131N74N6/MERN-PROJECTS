import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Loading from "../Components/Loading";
import Post from "../Components/Post";
import Header from "../Components/Header";
import "./Personal.css";

const Personal = () => {
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

    return (
        <div className="home-content">
            <section className="feature">
                <div className="user">{postingan?.data[0]?.nama}</div>
            </section>
            <section className="post-display">
                {error ? <p>{error.message}</p> : postIsLoad ? <Loading/> : 
                    postingan?.data?.map((post, index) => (
                        post.caption !== null ?
                        <Post key={`user-post-${index}`} data={post} route={`/personal/${post.id}`}/> :
                        <div className="message">Akun ini belum memposting apapun</div>
                    ))
                }
            </section>
            <Header/>
        </div>
    )
}

export default Personal;