const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const listJurusan = require("./list_jurusan");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = process.env.DB_PORT || 3500;
app.use(cors());
app.use(express.json());

// koneksi database
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

// menampilkan semua data
app.get("/", (request, response) => {
    let { page, limit } = request.query;

    // Konversi page dan limit menjadi integer, dan pastikan default jika tidak valid
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 11;

    // Pastikan page dan limit tidak bernilai negatif atau nol
    if (page < 1) page = 1;
    if (limit < 1) limit = 11;

    const offset = (page - 1) * limit; 
    const sqlGet = "SELECT * FROM data_alumni LIMIT ? OFFSET ?";

    db.query(sqlGet, [limit, offset], (error, result) => {
        if (error) {
            return response.status(500).json({ message: "Terjadi error pada server", error: error.message });
        }

        // Query untuk menghitung total data dalam tabel
        const sqlCount = `SELECT COUNT(*) AS total FROM data_alumni`;

        db.query(sqlCount, (error, countResult) => {
            if (error) {
                return response.status(500).json({ message: "Tidak dapat menampilkan jumlah data", error: err.message });
            }

            const totalData = countResult[0].total;
            const totalPages = Math.ceil(totalData / limit);

            return response.json({
                currentPage: page,
                perPage: limit,
                totalData: totalData,
                totalPages: totalPages,
                data: result
            });
        });
    });
});

// menampilkan data yang dipilih
app.get("/alumni/:id", (request, response) => {
    const sqlGet = "SELECT * FROM data_alumni WHERE id = ?";
    const id = request.params.id;

    db.query(sqlGet, [id], (error, result) => {
        if (error) {
            return response.json({ message: "Gagal menampilkan data berdasarkan id" });
        } 
        else {
            return response.json(result);
        }
    });
});

// menambahkan data ke database
app.post("/insert-data", (request, response) => {
    const sqlInsert = "INSERT INTO data_alumni (`nama`, `alamat`, `jurusan_prodi`, `jenis_kelamin`, `tahun_lulus`) VALUES (?, ?, ?, ?, ?)";
    const { nama, alamat, jurusan_prodi, jenis_kelamin, tahun_lulus } = request.body;
    const value = [ nama, alamat, jurusan_prodi, jenis_kelamin, tahun_lulus ];

    if (!nama || !alamat || !jurusan_prodi || !jenis_kelamin || isNaN(tahun_lulus)) {
        return response.status(400).json({ message: "Data tidak valid" });
    }

    db.query(sqlInsert, value, (error, result) => {
        if (error) {
            return response.json({ message: "Error saat memasukkan data"});
        } 
        else {
            return response.json(result);
        }
    });
});

// mengubah data yang dipilih
app.put("/edit-data/:id", (request, response) => {
    const sqlEdit = "UPDATE data_alumni SET nama = ?, alamat = ?, jurusan_prodi = ?, jenis_kelamin = ?, tahun_lulus = ? WHERE id = ?";
    const id = request.params.id;
    const { nama, alamat, jurusan_prodi, jenis_kelamin, tahun_lulus } = request.body;
    const value = [ nama, alamat, jurusan_prodi, jenis_kelamin, tahun_lulus, id ];

    if (!nama || !alamat || !jurusan_prodi || !jenis_kelamin || isNaN(tahun_lulus)) {
        return response.status(400).json({ message: "Data tidak valid" });
    }

    db.query(sqlEdit, value, (error, result) => {
        if (error) {
            return response.json({ message: "Error saat mengubah data"});
        } 
        else {
            return response.json(result);
        }
    });
});

// menghapus data yang dipilih
app.delete("/hapus/:id", (request, response) => {
    const sqlDelete = "DELETE FROM data_alumni WHERE id = ?";
    const id = request.params.id;

    db.query(sqlDelete, [id], (error, result) => {
        if (error) {
            return response.json({ message: "Error saat menghapus data"});
        } 
        else {
            return response.json(result);
        }
    });
});

// filter data alumni berdasarkan prodi
listJurusan.forEach(list => {
    app.get(list.route, (request, response) => {
        let { page, limit } = request.query;

        // Konversi page dan limit menjadi integer, dan pastikan default jika tidak valid
        page = parseInt(page) || 1;
        limit = parseInt(limit) || 11;

        // Pastikan page dan limit tidak bernilai negatif atau nol
        if (page < 1) page = 1;
        if (limit < 1) limit = 11;

        const sqlGet = list.sqlQuery;
        const offset = (page - 1) * limit;

        db.query(sqlGet, [limit, offset], (error, result) => {
            if (error) {
                return response.status(500).json({ message: "Terjadi error pada server", error: error.message });
            }

            // Query untuk menghitung total data dalam tabel
            const sqlCount = list.totalData;

            db.query(sqlCount, (error, countResult) => {
                if (error) {
                    return response.status(500).json({ message: "An error occurred while fetching total count", error: err.message });
                }

                const totalData = countResult[0].total;
                const totalPages = Math.ceil(totalData / limit);

                return response.json({
                    currentPage: page,
                    perPage: limit,
                    totalData: totalData,
                    totalPages: totalPages,
                    data: result
                });
            });
        });
    });
});

app.listen(port, () => {
    console.log(`server berhasil dijalankan pada port ${port}`);
});