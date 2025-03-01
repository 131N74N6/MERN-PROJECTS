import db from "../config/db-connection.js";
import fs from "fs-extra";

const getUserData = async (req, res) => {
    try {
        const sqlGet = "SELECT * FROM user LIMIT ? OFFSET ?";
        const sqlCount = "SELECT COUNT(*) AS total FROM user";
        let { limit, page } = req.query;

        limit = parseInt(limit) || 12;
        page = parseInt(page) || 1;
        const offset = (page - 1) * limit;

        if (page < 1) page = 1;
        if (limit < 1) limit = 12;

        const [result1] = await db.query(sqlGet, [limit, offset]);  
        const [countResult] = await db.query(sqlCount); 

        const totalData = countResult[0].total;
        const totalPage = Math.ceil(totalData / limit);

        res.json({
            status: 200,
            total_halaman: totalPage,
            total_data: totalData,
            tiap_halaman: limit,
            current_page: page,
            data: result1
        });
    } 
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}

const getUserDataById = async (req, res) => {
    try {
        const sql = "SELECT * FROM user WHERE id = ?";
        const id = req.params.id;
        const [result] = await db.query(sql, [id]);
    
        res.json(result);
    } 
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}

const filterBySearch = async (req, res) => {
    try {
        const sql = "SELECT * FROM user WHERE nama LIKE ? OR alamat LIKE ?";
        const search = req.query.s;

        const [result] = await db.query(sql, [`%${search}%`, `%${search}%`]);
        res.status(200).json({ status: 200, data: result });
    } 
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}

const addUserData = async (req, res) => {
    try {
        const sql = "INSERT INTO user (nama, alamat, jenis_kelamin, foto) VALUES (?, ?, ?, ?)";
        const { nama, alamat, jenis_kelamin } = req.body;

        const foto = req.file ? req.file.filename : req.body.foto || null;

        if (!nama || !alamat || !jenis_kelamin || !foto) { return res.status(400).json({ error: "Data tidak lengkap" }); }

        const values = [nama, alamat, jenis_kelamin, foto];
        const [result] = await db.query(sql, values);

        res.json({ message: "data berhasil ditambahkan", data: result });
    } 
    catch(error) {
        res.status(500).json({ error: "Internal server error" });
    }
}

const editUserData = async (req, res) => {
    try {
        const id = req.params.id;
        const { nama, alamat, jenis_kelamin } = req.body;
        const foto = req.file ? req.file.filename : req.body.foto || null;

        const sqlSelect = "SELECT foto FROM user WHERE id = ?";
        const [rows] = await db.query(sqlSelect, [id]);

        if (rows.length === 0) {
            return res.status(404).json({ message: "Data pengguna tidak ditemukan" });
        }

        const fotoLama = rows[0].foto;

        let sqlUpdate = "UPDATE user SET nama = ?, alamat = ?, jenis_kelamin = ?";
        const value = [nama, alamat, jenis_kelamin];

        // Jika ada file gambar baru, update foto
        if (foto) {
            sqlUpdate += ", foto = ?";
            value.push(foto); 
        }

        sqlUpdate += " WHERE id = ?";
        value.push(id);

        await db.query(sqlUpdate, value);

        // Hapus file lama hanya jika ada file baru yang diunggah
        if (fotoLama && foto && req.file) {
            const filePath = `./uploads/${fotoLama}`;
            await fs.unlink(filePath);
        }

        res.json({ message: "Data pengguna berhasil diubah" });
    } 
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}

const deleteOneUser = async (req, res) => {
    try {
        const sqlSelect = "SELECT foto FROM user WHERE id = ?"; // Ambil nama file foto
        const id = req.params.id;

        const [rows] = await db.query(sqlSelect, [id]);
        
        if (rows.length === 0) {
            return res.status(404).json({ message: "Data pengguna tidak ditemukan" });
        }

        const foto = rows[0].foto; // Nama file foto yang akan dihapus

        const sqlDelete = "DELETE FROM user WHERE id = ?"; // Hapus data pengguna dari database
        await db.query(sqlDelete, [id]);

        if (foto) { // Jika ada nama file foto, hapus filenya
            const filePath = `./uploads/${foto}`; // Path lengkap ke file foto
            await fs.unlink(filePath); // Hapus file foto dari folder uploads
        }

        res.json({ message: "Data pengguna dan foto berhasil dihapus" });
    } 
    catch (error) {
        console.error(error); 
        res.status(500).json({ error: "Internal server error" });
    }
}

const deleteAllUser = async (req, res) => {
    try {
        const sqlSelect = "SELECT foto FROM user"; // Ambil semua nama file foto
        const [rows] = await db.query(sqlSelect);

        const sqlDelete = "TRUNCATE TABLE user"; // Hapus semua data pengguna dari database
        await db.query(sqlDelete);

        for (const row of rows) {
            const foto = row.foto;
            if (foto) {
                const filePath = `./uploads/${foto}`;
                await fs.unlink(filePath); // Hapus semua file foto terkait
            }
        }

        res.json({ message: "Semua data pengguna dan foto berhasil dihapus" });
    } 
    catch (error) {
        console.error(error); 
        res.status(500).json({ error: "Internal server error" });
    }
}

export { getUserData, getUserDataById, filterBySearch, addUserData, editUserData, deleteOneUser, deleteAllUser };