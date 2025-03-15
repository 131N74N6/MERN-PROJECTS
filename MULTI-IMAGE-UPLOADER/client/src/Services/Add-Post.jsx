import { useEffect, useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import "./Add-Post.css";

const AddPost = () => {
    const queryQlient = useQueryClient();
    const navigate = useNavigate();
    const imgRef = useRef();
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!token) {
            navigate("/sign-in");
        }
    }, [navigate]);

    const [post, setPost] = useState({ caption: "", gambar: [], preview: [] });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleInput = (event) => {
        const { name, value } = event.target;
        setPost((prev) => ({ ...prev, [name]: value }));
    }

    const referTo = () => {
        imgRef.current.click();
    }

    const showImage = async (event) => {
        const files = Array.from(event.target.files);
        const allowed = ['image/jpg', 'image/jpeg', 'image/png'];
        setIsLoading(true);

        const validFiles = files.filter((file) => allowed.includes(file.type));
        const invalidFiles = files.filter((file) => !allowed.includes(file.type));

        if (invalidFiles.length > 0) {
            alert(`File ${invalidFiles.map((f) => f.name)} tidak didukung`);
        }
        
        try {
            const imgPreview = await Promise.all(validFiles.map((file) => 
                new Promise((resolve) => {
                    const reader = new FileReader();
                    reader.onload = () => resolve(reader.result);
                    reader.readAsDataURL(file);
                }))
            );
            setPost((prev) => ({ 
                ...prev, gambar: [...prev.gambar,...validFiles], preview: [...prev.preview,...imgPreview] 
            }));
        } 
        catch (error) {
            setError("GAGAL MEMPROSES GAMBAR");
        }
        finally {
            setIsLoading(false);
        }
    }

    const removePreview = (index) => {
        const newPreview = post.preview.filter((_, i) => i !== index);
        const newGambar = post.gambar.filter((_, i) => i !== index);
        setPost((prev) => ({ ...prev, gambar: newGambar, preview: newPreview }));
        imgRef.current.value = ""; 
    }

    const addMutation = useMutation({
        mutationFn: async () => {
            const formData = new FormData();
            formData.append("caption", post.caption);

            if (post.gambar.length > 0) {
                post.gambar.forEach((file) => formData.append("gambar", file));
            }

            const request = await fetch(`http://localhost:3602/user-post/add`, { 
                method: "POST", body: formData, headers: { "Authorization":  `Bearer ${token}` }
            });
            if (request.ok) {
                const response = await request.json();
                return response;
            }
            else {
                throw new Error("GAGAL MEMBUAT POSTINGAN");
            }
        },
        onSuccess: () => { 
            queryQlient.invalidateQueries(["postingan"]), 
            setPost({ caption: "", gambar: [], preview: [] });
            imgRef.current.value = ""; 
            navigate("/");
        }
    });

    const addNewPost = async (event) => {
        event.preventDefault();

        if (!post.caption.trim() || post.gambar.length === 0) {
            alert("DATA BELUM LENGKAP");
            return;
        }
        
        addMutation.mutate();
    }
    
    return (
        <div className="upload-field">
            <form title="img-uploader" onSubmit={addNewPost}> 
                <div className="image-preview">
                    {isLoading ? <p>loading...</p> : error ? <p>{error}</p> : 
                        post?.preview?.map((prev, index) => (
                            <div key={index} className="image-zone" onClick={() => removePreview(index)}>
                                <img key={index} src={prev} alt={`Preview ${index}`} />
                            </div>
                        ))
                    }
                </div>
                <input type="file" name="gambar" onChange={showImage} multiple ref={imgRef} accept="image/*"/>
                <div className="tanda" onClick={referTo}>Klik disini untuk memilih file</div>
                <input 
                    type="text" name="caption" onChange={handleInput} value={post.caption} 
                    placeholder="tulis caption"
                />
                <button type="submit"><i className="fa-solid fa-plus"></i></button>
                <Link to={"/"}>Kembali</Link>
            </form>
        </div>
    )
}

export default AddPost;
