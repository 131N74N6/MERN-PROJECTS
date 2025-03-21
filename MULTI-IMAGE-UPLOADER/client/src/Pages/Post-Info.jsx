import { Link, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Comment from "./Comment";
import "./Post-Info.css";

const PostInfo = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    const [index, setIndex] = useState(0);

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

    return (
        <div className="post-detail">
            <div className="user"><Link to={`/user/${detailInfo?.id_pengguna}`}>{detailInfo?.nama}</Link></div>
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
                                <Link to="/home">Kembali</Link>
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
                    </div>
                }
                <Comment postId={id} token={token}/>
            </div>
        </div>
    )
}

export default PostInfo;