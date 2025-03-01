import express from "express";
import { getUserData, getUserDataById, addUserData } from "../controllers/user-controller.js";
import { editUserData, deleteOneUser, deleteAllUser } from "../controllers/user-controller.js";
import { filterBySearch } from "../controllers/user-controller.js"
import upload from "../config/upload-config.js";

const userRouter = express();

userRouter.get("/", getUserData);
userRouter.post("/add-data", upload.single("foto"), addUserData);
userRouter.get("/select/:id", getUserDataById);
userRouter.get("/search", filterBySearch);
userRouter.put("/change-data/:id", upload.single("foto"), editUserData);
userRouter.delete("/delete/:id", deleteOneUser);
userRouter.delete("/delete-all", deleteAllUser);

export default userRouter;