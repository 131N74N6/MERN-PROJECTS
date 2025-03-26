import express from "express";
import { changeUserData, signIn } from "../controllers/user-controllers.js";
import auth from "../configs/auth-config.js";

const userRoutes = express.Router();

userRoutes.post("/sign-in", signIn);
userRoutes.put("/identity", auth, changeUserData);

export default userRoutes;