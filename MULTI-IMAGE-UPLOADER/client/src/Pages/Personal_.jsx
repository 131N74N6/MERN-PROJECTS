import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import Loading from "../Components/Loading";
import Post from "../Components/Post";
import Header from "../Components/Header";
import "./Personal.css";

export default function Personal_() {
    const { id_pengguna } = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!token) {
            navigate("/sign-in");
        }
    }, [navigate]);

    const { data: postingan, isLoading: postIsLoad, error } = useQuery({
        queryKey: ["userPost", id_pengguna],
        queryFn: async () => {
            const request = await fetch(`http://localhost:3602/user-post/user/${id_pengguna}`, {
                method: "GET"
            });
            if (request.ok) {
                const response = await request.json();
                return response;
            }
            else {
                throw new Error("GAGAL MENAMPILKAN POSTINGAN");
            }
        },
        staleTime: 4000,
        cacheTime: 300000
    });

    console.log(postingan);

    return (
        <div className="home-content">
            <div className="feature">
                <div className="user">{postingan?.data[0]?.nama}</div>
            </div>
            <div className="post-display">
                {error ? <p>{error.message}</p> : postIsLoad ? <Loading/> : 
                    postingan?.data?.map((post, index) => (
                        post.caption !== null ?
                        <Post key={`allUserPost-${index}`} data={post} route={`/post/${post.id}`}/> :
                        <div className="message">Akun ini belum memposting apapun</div>
                    ))
                }
            </div>
            <Header/>
        </div>
    )
}
