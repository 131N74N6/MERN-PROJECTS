import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

let db;
try {
    db = mysql.createPool({
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD
    });
    console.log("DATABASE TERHUBUNG!");
} catch (error) {
    console.log("DATABASE GAGAL TERHUBUNG!");
    console.log(error);
}

export default db;