import db from "../config/db-connection.js";
import fs from "fs-extra";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const signUp = async (req, res) => {
    let database;
    try {
        database = await db.getConnection();
        await database.beginTransaction();

        const { username, email, password } = req.body;

        if (!username?.trim() || !email?.trim() || !password?.trim()) {
            return res.status(400).json({ status: 400, msg: "HARAP MASUKKAN DATA DENGAN LENGKAP" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const sql = "INSERT INTO user (username, email, password) VALUES (?, ?, ?)";
        const values = [username, email, hashedPassword];

        await database.query(sql, values);
        await database.commit();
        res.json({ status: 201, msg: "SIGN-UP BERHASIL! SILAHKAN SIGN-IN..." });
    } 
    catch (error) {
        if (database) await database.rollback();
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ status: 409, msg: "Username/Email sudah terdaftar" });
        }
        res.status(500).json({ status: 500, msg: error.message || "INTERNAL SERVER ERROR" });
    }
    finally {
        if (database) database.release();
    }
}

const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        if (!email?.trim() || !password?.trim()) {
            return res.status(400).json({ msg: 'Harap isi semua field' });
        }

        const [result] = await db.query("SELECT * FROM user WHERE email = ?", [email.trim().toLowerCase()]);
        
        if (result.length === 0) {
            return res.status(401).json({ msg: 'Email tidak terdaftar' });
        }

        const user = result[0];
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ msg: 'Password salah' });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email, username: user.username }, 
            process.env.JWT_SECRET, { expiresIn: '1d' }
        );

        res.status(200).json({
            status: 200, token, msg: "Login berhasil",
            user: { id: user.id, email: user.email, username: user.username }
        });
    } 
    catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ status: 500, msg: error.message || "INTERNAL SERVER ERROR" });
    }
}

const deleteAccount = async (req, res) => {
    let database;
    try {
        database = await db.getConnection();
        await database.beginTransaction();

        const sql1 = "SELECT gambar FROM media WHERE postingan_id = ?";
        const id = req.params.id;
        const [media] = await database.query(sql1, [id]);
        await Promise.all(media.map((gb) => 
            fs.promises.unlink(`uploads/${gb.gambar}`).catch(() => {}
        )));
        
        const sql2 = "DELETE FROM media WHERE postingan_id = ?";
        await database.query(sql2, [id]);
        
        const sql3 = "DELETE FROM komentar WHERE postingan_id = ?";
        await database.query(sql3, [id]);

        const sql4 = "DELETE FROM postingan WHERE user_id = ?";
        await database.query(sql4, [id]);
        
        const sql5 = "DELETE FROM user WHERE id = ?";
        await database.query(sql5, [id]);

        await database.commit();
        res.json({ status: 200, msg: "AKUN BERHASIL DIHAPUS! SILAHKAN SIGN-UP UNTUK MENGAKSES" });
    } 
    catch (error) {
        if (database) await database.rollback();
        res.status(500).json({ status: 500, msg: "INTERNAL SERVER ERROR" });
    }
    finally {
        if (database) database.release();
    }
}

export { deleteAccount, signUp, signIn }