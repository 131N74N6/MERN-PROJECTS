import express from "express";
import { addPost, getAllPost, selectPost, deleteAllPost, deletePost } from "../controllers/post-controllers.js";
import upload from "../config/upload-config.js";

const postRoutes = express.Router();

postRoutes.get("/", getAllPost);
postRoutes.post("/add", upload.array("gambar"), addPost);
postRoutes.get("/post/:id", selectPost);
postRoutes.delete("/delete/:id", deletePost);
postRoutes.delete("/delete-all", deleteAllPost);

export default postRoutes;
