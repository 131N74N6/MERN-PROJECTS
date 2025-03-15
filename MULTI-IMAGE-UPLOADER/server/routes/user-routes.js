import { signIn, signUp, deleteAccount } from "../controllers/user-controllers.js";
import express from "express";
import auth from "../config/auth-config.js";

const userRouter = express.Router();

userRouter.post("/sign-up", signUp);
userRouter.post("/sign-in", signIn);
userRouter.delete("/delete-user/:id", auth, deleteAccount);

export default userRouter;
