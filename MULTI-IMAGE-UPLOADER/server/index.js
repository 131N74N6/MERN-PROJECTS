import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import postRoutes from "./routes/post-routes.js";
import userRouter from "./routes/user-routes.js";
import commentRoutes from "./routes/comment-routes.js";

dotenv.config();

const app = express();
const port = process.env.port || 3602;

app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: `http://localhost:5173`,
    methods: ['GET', 'POST', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use('/uploads', express.static('uploads/'));
app.use("/user-post", postRoutes);
app.use("/auth", userRouter);
app.use("/comments", commentRoutes)

app.listen(port, () => {
    console.log(`🚀 AKTIF DENGAN PORT ${port}`);
});
