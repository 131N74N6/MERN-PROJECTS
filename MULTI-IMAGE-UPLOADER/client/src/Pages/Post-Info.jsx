import { Link, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import "./Post-Info.css";

const PostInfo = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const queryQlient = useQueryClient();

    const [index, setIndex] = useState(0);

    const nextSlide = () => {
        index < detailInfo?.gambar.length - 1 ? setIndex((prev) => prev + 1) : setIndex(0);
        console.log(index);
    }

    const prevSlide = () => {
        index > 0 ? setIndex((prev) => prev - 1) : setIndex(0);
        console.log(index);
    }
    
    const { data: detailInfo, error } = useQuery({
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

    const removeMutation = useMutation({
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
        removeMutation.mutate();
    }

    return (
        <div className="post-detail">
            <div className="contents">
                {error ? <p>{error.message}</p> : 
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
                                <button className="nav-btn prev" onClick={prevSlide}>&larr;</button>
                                <button className="nav-btn next" onClick={nextSlide}>&rarr;</button>
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
                            <div className="action-buttons">
                                <button onClick={deletePost}>Hapus</button>
                                <Link to="/">Kembali</Link>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default PostInfo;