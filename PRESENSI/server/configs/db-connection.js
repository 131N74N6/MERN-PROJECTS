import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

let db;
try {
    db = mysql.createPool({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });
    console.log("DATABASE TERHUBUNG");
} 
catch (error) {
    console.log("GAGAL TERHUBUNG KE DATABASE", error);
}

export default db;