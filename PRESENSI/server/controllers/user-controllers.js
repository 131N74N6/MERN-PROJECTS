import db from "../configs/db-connection.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

const signIn = async (req, res) => {
    try {
        const { username, kata_sandi } = req.body;

        if (!username.trim() || !kata_sandi.trim()) {
            return res.status(400).json({ status: 400, msg: "Data belum lengkap!" });
        }

        const sql = `SELECT * FROM pengguna WHERE username = ?`;
        const [result] = await db.query(sql, [username.toLowerCase()]);
        const isMatch = result.find((rs) => { return rs.kata_sandi === kata_sandi });

        if (!isMatch) {
            return res.status(400).json({ status: 400, msg: "Password salah! coba lagi" });
        }

        const user = result[0];

        const token = jwt.sign(
            { id: user.id, username: user.username, password: user.password, kelasId: user.kelas_id }, 
            process.env.SECRET
        );

        res.status(200).json({ status: 200, token, msg: "Sign in berhasil", data: user });
    } 
    catch (error) {
        res.status(500).json({ status: 500, msg: "INTERNAL SERVER ERROR" });
    }
}

const getDataUser = async (req, res) => {
    try {
        const userId = req.user.id;
        const sql = `SELECT 
            username, kata_sandi, jenis_kelamin, alamat, nama_ayah, nama_ibu 
            FROM pengguna WHERE id = ?`;
        
        const [result] = await db.query(sql, [userId]);
        res.status(200).json({ status: 200, msg: "Sign in berhasil", data: result });
    } 
    catch (error) {
        res.status(500).json({ status: 500, msg: "INTERNAL SERVER ERROR" });
    }
}

const changeUserData = async (req, res) => {
    let database;
    try {
        database = db.getConnection();
        database.beginTransaction();

        const { username, kata_sandi, jenis_kelamin, alamat, nama_ayah, nama_ibu } = req.body;
        const userId = req.user.id;

        const sql = `UPDATE pengguna 
            SET username = ?, kata_sandi = ?, jenis_kelamin = ?, alamat = ?, nama_ayah = ?, nama_ibu = ? 
            WHERE id = ?`;
        const values = [username, kata_sandi, jenis_kelamin, alamat, nama_ayah, nama_ibu, userId];
        
        await database.query(sql, values);
        await database.commit();
        res.status(200).json({ status: 200, msg: "Data berhasil diperbarui" });
    } 
    catch (error) {
        if (database) await database.rollback();
        res.status(500).json({ status: 500, msg: "INTERNAL SERVER ERROR" });
    }
    finally {
        if (database) database.release();
    }
}

const getAllFromSameClass = async (req, res) => {
    try {
        const kelasId = req.user.kelasId;
        const sql = `SELECT 
            pengguna.username, 
            kelas.nama_kelas
        FROM kelas
        JOIN pengguna ON kelas.id = pengguna.kelas_id
        WHERE kelas.id = ?`;
        
        const [result] = await db.query(sql, [kelasId]);
        res.status(200).json({ status: 200, msg: "Sign in berhasil", data: result });
    } 
    catch (error) {
        res.status(500).json({ status: 500, msg: "INTERNAL SERVER ERROR" });
    }
}

const getUserSchedule = async (req, res) => {
    try {
        const userId = req.user.id;
        const sql = `SELECT 
            pengguna.username, 
            jadwal.nama_pelajaran, 
            jadwal.jam_mulai, 
            jadwal.jam_selesai,
            kelas.nama_kelas
        FROM kelas
        JOIN pengguna ON kelas.id = pengguna.kelas_id
        JOIN jadwal ON kelas.id = jadwal.kelas_id
        WHERE pengguna.id = ?`;
        
        const [result] = await db.query(sql, [userId]);
        res.status(200).json({ status: 200, msg: "Sign in berhasil", data: result });
    } 
    catch (error) {
        res.status(500).json({ status: 500, msg: "INTERNAL SERVER ERROR" });
    }
}

export { changeUserData, getAllFromSameClass, getUserSchedule, getDataUser, signIn }