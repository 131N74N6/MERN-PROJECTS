import express from "express";
import { changeUserData, getAllFromSameClass, getDataUser, getUserSchedule, signIn } from "../controllers/user-controllers.js";
import auth from "../configs/auth-config.js";

const userRoutes = express.Router();

userRoutes.post("/sign-in", signIn);
userRoutes.get("/", auth, getDataUser);
userRoutes.get("/list-student", auth, getAllFromSameClass);
userRoutes.put("/info", auth, changeUserData);
userRoutes.get("/schedule", auth, getUserSchedule);

export default userRoutes;
