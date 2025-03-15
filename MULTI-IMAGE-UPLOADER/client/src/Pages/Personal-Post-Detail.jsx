import { Link, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Comment from "./Comment";
import "./Personal-Post-Detail.css";

const Personal_Post_Detail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const queryQlient = useQueryClient();
    const [index, setIndex] = useState(0);
    
    const token = localStorage.getItem("token");
    useEffect(() => {
        if (!token) {
            navigate("/sign-in");
        }
    }, [navigate]);

    const nextSlide = () => {
        index < detailInfo?.gambar.length - 1 ? setIndex((prev) => prev + 1) : setIndex(0);
    }

    const prevSlide = () => {
        index > 0 ? setIndex((prev) => prev - 1) : setIndex(detailInfo?.gambar.length - 1);
    }
    
    const { data: detailInfo, isLoading: infoIsLoad, error: errorInfo } = useQuery({
        queryKey: ["postingan", id],
        queryFn: async () => {
            const request = await fetch(`http://localhost:3602/user-post/post/${encodeURIComponent(id)}`, { 
                method: "GET"
            });
            if (request.ok) {
                const response = await request.json();
                return response.data[0];
            }
            else {
                throw new Error("GAGAL MEMBUAT POSTINGAN");
            }
        },
        staleTime: 4000,
        cacheTime: 300000
    });
    
    const { data: comments, isLoading: commentIsLoad, error: noComments } = useQuery({
        queryKey: ["comment", id],
        queryFn: async () => {
            const request = await fetch(`http://localhost:3602/comments/${encodeURIComponent(id)}`, { 
                method: "GET"
            });
            if (request.ok) {
                const response = await request.json();
                return response;
            }
            else {
                throw new Error("GAGAL MENAMPILKAN KOMENTAR");
            }
        },
        staleTime: 4000,
        cacheTime: 300000
    });

    const removePostMutation = useMutation({
        mutationFn: async () => {
            const request = await fetch(`http://localhost:3602/user-post/delete/${id}`, { 
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
        onSuccess: () => { 
            queryQlient.invalidateQueries(["postingan", id]),
            navigate("/");
        }
    });

    const deletePost = async () => {
        removePostMutation.mutate();
    }

    return (
        <div className="post-detail">
            <div className="user"><Link to={"/"}>{detailInfo?.nama}</Link></div>
            <div className="contents">
                {errorInfo? <p>{errorInfo.message}</p> : infoIsLoad ? <p>Loading...</p> :
                    <div className="instagram-style">
                        <div className="carousel-wrapper">
                            <div className="carousel-container" 
                                style={{ transform: `translateX(-${index * 100}%)` }}>
                                {detailInfo?.gambar.map((gb, i) => (
                                    <div key={i} className="slide">
                                        <img 
                                            src={`http://localhost:3602/uploads/${encodeURIComponent(gb)}`} 
                                            alt={`Slide-${i + 1}`}
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className="navigation-buttons">
                                <button type="button" className="nav-btn prev" onClick={prevSlide}>&larr;</button>
                                <button type="button" className="nav-btn next" onClick={nextSlide}>&rarr;</button>
                            </div>
                            <div className="pagination-dots">
                                {detailInfo?.gambar.map((_, i) => (
                                    <div 
                                        key={i} 
                                        className={`dot ${i === index ? 'active' : ''}`}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="caption-section">
                            <p>{detailInfo?.caption}</p>
                            <span>{detailInfo?.waktu}</span>
                            <div className="action-buttons">
                            <button onClick={deletePost}>Hapus</button>
                                <Link to="/">Kembali</Link>
                            </div>
                        </div>
                    </div>
                }
            </div>
            <div className="comment-section">
                {noComments ? <p>{noComments.message}</p> : commentIsLoad ? <p>Loading...</p> : 
                    <div className="comments-display">
                        <div className="comment-list">
                            {comments.data?.map((cmt, i) => (
                                <div key={`komentar-${i+1}`}>
                                    <div>{cmt.nama_pengguna}</div>
                                    <div>{cmt.waktu}</div>
                                    <div>{cmt.tanggapan}</div>
                                </div>
                            ))}
                        </div>
                        <Comment postId={id} token={token}/>
                    </div>
                }
            </div>
        </div>
    )
}

export default Personal_Post_Detail;