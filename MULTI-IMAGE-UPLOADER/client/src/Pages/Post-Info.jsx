import { Link, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Post-Info.css";

const PostInfo = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const queryQlient = useQueryClient();
    
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

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 3000,
    }

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
            <Link to="/">Kembali</Link>
            {error ? <p>{error.message}</p> : 
                <>
                    <Slider {...settings}>
                        {detailInfo?.gambar.map((gb, index) => (
                            <div key={index} className="image-zone">
                                <img 
                                    className="images" key={index} 
                                    src={`http://localhost:3602/uploads/${encodeURIComponent(gb)}`} 
                                    alt={`Slide-${index + 1}`}
                                />
                            </div>
                        ))}
                    </Slider>
                    <div className="post-caption">
                        <p>{detailInfo?.caption}</p>
                        <button type="button" onClick={() => deletePost()}>🗑️</button>
                    </div>
                </>
            }
        </div>        
    )
}

export default PostInfo;