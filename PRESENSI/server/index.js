import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const port = process.env.PORT || 3555;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.listen(port, () => {
    console.log(`$SERVER BERJALAN PADA PORT ${port}`);
});