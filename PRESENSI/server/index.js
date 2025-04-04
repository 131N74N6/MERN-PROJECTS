import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user-routes.js";
import attendanceRoutes from "./routes/attendance-routes.js";

dotenv.config({ path: "./.env" });

const app = express();
const port = process.env.PORT || 3555;

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/user", userRoutes);
app.use("/attendance", attendanceRoutes);

app.listen(port, () => {
    console.log(`$SERVER BERJALAN PADA PORT ${port}`);
});