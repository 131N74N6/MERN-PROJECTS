import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Post from "../Components/Post";
import "./Home.css";
import { Link } from "react-router-dom";

const Home = () => {
    const queryQlient = useQueryClient();

    const { data: postingan, error } = useQuery({
        queryKey: ["postingan"],
        queryFn: async () => {
            const request = await fetch(`http://localhost:3602/user-post/`, { method: "GET" });
            if (request.ok) {
                const response = await request.json();
                return response;
            }
            else {
                throw new Error("GAGAL MEMBUAT POSTINGAN");
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

    return (
        <div className="home-content">
            <div className="feature">
                <Link to={"/add"}>+ Buat Postingan</Link>
                <button type="button" onClick={deleteAllPost}>Hapus Semua Postingan</button>
            </div>
            <div className="post-content">
                {error ? <p>{error.message}</p> : postingan?.data?.map((post, index) => (
                    <Post key={`user-post-${index}`} data={post}/>
                ))}
            </div>
        </div>
    )
}

export default Home;