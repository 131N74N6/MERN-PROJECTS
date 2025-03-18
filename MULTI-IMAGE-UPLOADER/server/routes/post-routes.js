import express from "express";
import { 
    addPost, getAllPost, getDataByFilter,getPersonalPost, 
    getUserPost, selectPost, deleteAllUserPost, deletePost 
} from "../controllers/post-controllers.js";
import upload from "../config/upload-config.js";
import auth from "../config/auth-config.js";

const postRoutes = express.Router();

postRoutes.post("/add", auth, upload.array("gambar"), addPost);
postRoutes.get("/", auth, getPersonalPost);
postRoutes.get("/user/:id", getUserPost);
postRoutes.get("/post/:id", selectPost);
postRoutes.get("/all-posts", getAllPost);
postRoutes.get("/search", getDataByFilter);
postRoutes.delete("/delete/:id", deletePost);
postRoutes.delete("/delete-all", auth, deleteAllUserPost);

export default postRoutes;
