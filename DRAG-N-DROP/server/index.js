const cors = require("cors");
const express = require("express");
const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = process.env.PORT || 3600;
app.use(cors());
app.use(express.json());

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

db.getConnection((err, connection) => {
    if (err) {
        console.error("Gagal terhubung ke database:", err);
    } 
    else {
        console.log("Terhubung ke database!");
        connection.release(); // Bebaskan koneksi
    }
});

app.get("/", (req, res) => {
    const sql = "SELECT list.id, list.nama_aktivitas, list.kategori_id, kategori.nama_kategori FROM list JOIN kategori ON list.kategori_id = kategori.id ORDER BY list.id ASC";

    db.query(sql, (error, result) => {
        if (error) {
            return res.json("CEK KONEKSI ANDA KARENA GAGAL MEMUAT DATA DARI DATABASE");
        }
        else {
            return res.json(result);
        }
    });
});

app.post("/insert-data", (req, res) => {
    const sql = "INSERT INTO list (nama_aktivitas, kategori_id) VALUES (?, ?)";
    const { nama_aktivitas, kategori_id } = req.body;
    const value = [nama_aktivitas, kategori_id];

    db.query(sql, value, (error, result) => {
        if (error) {
            return res.json("GAGAL MEMASUKKAN DATA KARENA KONEKSI INTERNET TERPUTUS/TIDAK STABIL");
        }
        else {
            return res.json(result);
        }
    });
});

app.put("/change/:id", (req, res) => {
    const sql = "UPDATE list SET kategori_id = ? WHERE id = ?";
    const { kategori_id } = req.body;
    const id = req.params.id;
    const value = [ kategori_id, id ];

    if (!kategori_id) {
        return res.status(400).json("PILIH DAN DRAG DATA TERLEBIH DAHULU");
    }

    db.query(sql, value, (error, result) => {
        if (error) {
            return res.json("GAGAL MENGUBAH DATA KARENA KONEKSI INTERNET TERPUTUS/TIDAK STABIL");
        }
        else {
            return res.json(result);
        }
    });
})

app.delete("/remove/:id", (req, res) => {
    const sql = "DELETE FROM list WHERE id = ?";
    const id = req.params.id;
    
    db.query(sql, [id], (error, result) => {
        if (error) {
            return res.json("CEK KONEKSI ANDA KARENA GAGAL MEMUAT MENGHAPUS LIST");
        }
        else {
            return res.json(result);
        }
    });
});

app.delete("/remove-all", (req, res) => {
    const sql = "TRUNCATE TABLE list";
    
    db.query(sql, (error, result) => {
        if (error) {
            return res.json("CEK KONEKSI ANDA KARENA GAGAL MEMUAT MENGHAPUS LIST");
        }
        else {
            return res.json(result);
        }
    });
});

app.listen(port, () => {
    console.log(`SERVER AKTIF DENGAN PORT ${port}`);
});