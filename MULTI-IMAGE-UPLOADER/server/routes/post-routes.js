import express from "express";
import { 
    addPost, getAllPost, getDataByFilter, getUserPost, selectPost, deleteAllPost, deletePost 
} from "../controllers/post-controllers.js";
import upload from "../config/upload-config.js";
import auth from "../config/auth-config.js";

const postRoutes = express.Router();

postRoutes.get("/", auth, getUserPost);
postRoutes.get("/post/:id", selectPost);
postRoutes.get("/all-posts", getAllPost);
postRoutes.get("/search", getDataByFilter);
postRoutes.post("/add", auth, upload.array("gambar"), addPost);
postRoutes.delete("/delete/:id", deletePost);
postRoutes.delete("/delete-all", deleteAllPost);

export default postRoutes;
