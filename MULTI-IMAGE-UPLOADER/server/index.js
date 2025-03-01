import express from "express";
import cors from "cors";
import postRoutes from "./routes/post-routes.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.port || 3602;
app.use(express.json());
app.use(cors());

app.use('/uploads', express.static('uploads/'));
app.use("/user-post", postRoutes);

app.listen(port, () => {
    console.log(`🚀 AKTIF DENGAN PORT ${port}`);
});