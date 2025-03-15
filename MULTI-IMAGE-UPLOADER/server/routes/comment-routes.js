import { makeComment, showAllComments } from "../controllers/comment-controllers.js";
import express from "express";
import auth from "../config/auth-config.js";

const commentRoutes = express.Router();

commentRoutes.get("/:id", showAllComments);
commentRoutes.post("/add", auth, makeComment);

export default commentRoutes;