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
app.use(cors());

app.use('/uploads', express.static('uploads/'));
app.use("/user-post", postRoutes);
app.use("/auth", userRouter);
app.use("/comments", commentRoutes)

app.listen(port, () => {
    console.log(`🚀 AKTIF DENGAN PORT ${port}`);
});

/*SELECT
    pengguna.username AS nama,
    postingan.id AS id,
    postingan.caption AS caption,
    postingan.created_at AS waktu,
    JSON_ARRAYAGG(media.gambar) AS gambar,
    (SELECT JSON_ARRAYAGG(komen) FROM komentar WHERE komentar.postingan_id = postingan.id) AS komentar
FROM user AS pengguna
JOIN postingan ON pengguna.id = postingan.user_id
JOIN media ON postingan.id = media.postingan_id
WHERE postingan.id = 1
GROUP BY postingan.id; */