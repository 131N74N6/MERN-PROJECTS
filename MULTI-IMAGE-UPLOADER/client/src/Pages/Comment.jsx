import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import InputField from "../Components/InputField";
import "./Comment.css";

const Comment = ({ postId, token }) => {
    const [comment, setComment] = useState("");
    const queryQlient = useQueryClient();

    const handleInput = (event) => {
        setComment(event.target.value);
    }

    const addMutationComment = useMutation({
        mutationFn: async () => {
            const data = { komen: comment, postingan_id: Number(postId) }

            if (comment.trim() === "") { throw new Error("Komentar tidak boleh kosong"); }

            const request = await fetch(`http://localhost:3602/comments/add`, { 
                method: "POST", 
                body: JSON.stringify(data), 
                headers: { 
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json" 
                }
            });
            if (request.ok) {
                const response = await request.json();
                return response;
            }
            else {
                throw new Error("GAGAL MEMBUAT KOMENTAR");
            }
        },
        onSuccess: () => { 
            queryQlient.invalidateQueries(["komentar", postId]);
            setComment(""); 
        },
        onError: (error) => {
            console.error("Error adding comment:", error);
        }
    });

    const handleAddComment = async (event) => {
        event.preventDefault();
        addMutationComment.mutate();
    }

    return (
        <div className="commentSection">
            <form onSubmit={handleAddComment} title="add-comment">
                <InputField 
                    label="Comment" 
                    type="text"
                    name="comment" 
                    value={comment} 
                    handleInput={handleInput} 
                />
                <button type="submit">
                    <i className="fa-solid fa-paper-plane"></i>
                </button>
            </form>
        </div>
    )
}

export default Comment;