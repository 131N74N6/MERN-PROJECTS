import express from "express";
import fillAttendance from "../controllers/attendance-controllers.js";
import auth from "../configs/auth-config.js";

const attendanceRoutes = express.Router();

attendanceRoutes.post("/fill-attendance", auth, fillAttendance);

export default attendanceRoutes;
