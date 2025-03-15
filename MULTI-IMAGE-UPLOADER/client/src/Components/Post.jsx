import { FaRegImages } from 'react-icons/fa';
import { Link } from "react-router-dom";
import "./Post.css";

const Post = ({ data, route }) => {
    return (
        <div className="post">
            <div className="post-media">
                <Link to={route}>
                    {data?.gambar.map((gb, index) => (
                        <img key={index} src={`http://localhost:3602/uploads/${encodeURIComponent(gb)}`} alt={`Post ${index + 1}`}/>
                    ))}
                    {data.gambar.length > 1 ? (
                        <div className="multi-image-badge">
                            <FaRegImages/>
                            <span>{data.gambar.length}</span>
                        </div>
                    ) : <></>}
                </Link>
            </div>
        </div>
    )
}

export default Post;