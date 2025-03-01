import cors from "cors";
import express from "express";
import userRouter from "./routes/user-routes.js";

const app = express();
const port = process.env.PORT || 3601;
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads/'));

app.use("/users-data", userRouter);

app.listen(port, () => {
    console.log(`🚀 AKTIF PADA PORT ${port}`);
});