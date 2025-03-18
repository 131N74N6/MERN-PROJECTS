import { deleteAccount, signIn, signUp } from "../controllers/user-controllers.js";
import auth from "../config/auth-config.js";
import express from "express";

const userRouter = express.Router();

userRouter.post("/sign-up", signUp);
userRouter.post("/sign-in", signIn);
userRouter.delete("/delete-account", auth, deleteAccount);

export default userRouter;
