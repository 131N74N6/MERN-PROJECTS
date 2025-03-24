import db from "../config/db-connection.js";
import fs from "fs-extra";

const getAllPost = async (req, res) => {
    try {
        const sql = `
            SELECT
                pengguna.id AS id_pengguna,
                pengguna.username AS nama,
                postingan.id AS id, 
                postingan.caption AS caption, 
                postingan.created_at AS waktu,
                JSON_ARRAYAGG(media.gambar) AS gambar
            FROM user AS pengguna  
            JOIN postingan ON pengguna.id = postingan.user_id
            JOIN media ON postingan.id = media.postingan_id
            GROUP BY pengguna.id, pengguna.username, postingan.id, postingan.caption, postingan.created_at`;

        const [result] = await db.query(sql);
        res.status(200).json({ status: 200, data: result });
    } 
    catch (error) {
        res.status(500).json({ status: 500, msg: "INTERNAL SERVER ERROR" });
    }
}

const getPersonalPost = async (req, res) => {
    try {
        const userName = req.user.username;
        const sql = `
            SELECT
                pengguna.id AS id_pengguna,
                pengguna.username AS nama,
                postingan.id AS id, 
                postingan.caption AS caption, 
                postingan.created_at AS waktu,
                JSON_ARRAYAGG(media.gambar) AS gambar
            FROM user AS pengguna  
            LEFT JOIN postingan ON pengguna.id = postingan.user_id
            LEFT JOIN media ON postingan.id = media.postingan_id
            WHERE pengguna.username = ?
            GROUP BY pengguna.id, pengguna.username, postingan.id, postingan.caption, postingan.created_at`;

        const [result] = await db.query(sql, [userName]);
        res.status(200).json({ status: 200, data: result });
    } 
    catch (error) {
        res.status(500).json({ status: 500, msg: "INTERNAL SERVER ERROR" });
    }
}

const getUserPost = async (req, res) => {
    try {
        const userId = req.params.id;
        const sql = `
            SELECT
                pengguna.id AS id_pengguna,
                pengguna.username AS nama,
                postingan.id AS id, 
                postingan.caption AS caption, 
                postingan.created_at AS waktu,
                JSON_ARRAYAGG(media.gambar) AS gambar
            FROM user AS pengguna  
            LEFT JOIN postingan ON pengguna.id = postingan.user_id
            LEFT JOIN media ON postingan.id = media.postingan_id
            WHERE pengguna.id = ?
            GROUP BY pengguna.id, pengguna.username, postingan.id, postingan.caption, postingan.created_at`;

        const [result] = await db.query(sql, [userId]);
        res.status(200).json({ status: 200, data: result });
    } 
    catch (error) {
        res.status(500).json({ status: 500, msg: "INTERNAL SERVER ERROR" });
    }
}

const getDataByFilter = async (req, res) => {
    try {
        const search = req.query.q;
        const sql = `
            SELECT
                pengguna.id AS id_pengguna,
                pengguna.username AS nama,
                postingan.id AS id, 
                postingan.caption AS caption, 
                postingan.created_at AS waktu,
                JSON_ARRAYAGG(media.gambar) AS gambar
            FROM user AS pengguna  
            JOIN postingan ON pengguna.id = postingan.user_id
            JOIN media ON postingan.id = media.postingan_id
            WHERE postingan.caption LIKE ? OR pengguna.username LIKE ?
            GROUP BY pengguna.id, pengguna.username, postingan.id, postingan.caption, postingan.created_at`;

        const values = [`%${search}%`, `%${search}%`];
        const [result] = await db.query(sql, values);
        res.status(200).json({ status: 200, data: result });
    } 
    catch (error) {
        res.status(500).json({ status: 500, msg: "INTERNAL SERVER ERROR" });
    }
}

const addPost = async (req, res) => {
    let database;
    try {
        database = await db.getConnection();
        await database.beginTransaction();

        const { caption } = req.body; 
        const userId = req.user.id;
        const files = req.files || null;

        const sql1 = "INSERT INTO postingan (caption, user_id) VALUES (?, ?)";
        const sql2 = "INSERT INTO media (gambar, postingan_id) VALUES (?, ?)";

        if (!caption?.trim() || !files?.length) {
            return res.status(400).json({ status: 400, msg: "DATA BELUM LENGKAP" });
        }

        const [result] = await database.query(sql1, [caption, userId]);
        const getIdFromPostingan = result.insertId;

        await Promise.all(files.map(async (gb) => 
            await database.query(sql2, [gb.filename, getIdFromPostingan])
        ));

        await database.commit();
        res.json({ status: 200, msg: "POSTINGAN BERHASIL DIBUAT" });
    } 
    catch (error) {
        if (database) await database.rollback();
        if (req.files) { 
            await Promise.all(req.files.map(file => fs.unlink(`uploads/${file.filename}`)));
        }
        res.status(500).json({ status: 500, msg: "INTERNAL SERVER ERROR" });
    }
    finally {
        if (database) database.release();
    }
}

const selectPost = async (req, res) => {
    try {        
        const sql = `
            SELECT
                pengguna.id AS id_pengguna,
                pengguna.username AS nama,
                postingan.id AS id, 
                postingan.caption AS caption, 
                postingan.created_at AS waktu,
                JSON_ARRAYAGG(media.gambar) AS gambar
            FROM user AS pengguna  
            JOIN postingan ON pengguna.id = postingan.user_id
            JOIN media ON postingan.id = media.postingan_id 
            WHERE postingan.id = ?`;

        const id = req.params.id;
        const [result] = await db.query(sql, [id]);

        res.json({ status: 200, data: result });
    } 
    catch (error) {
        res.status(500).json({ status: 500, msg: "INTERNAL SERVER ERROR" });
    }
}

const deletePost = async (req, res) => {
    let database;
    try {
        database = await db.getConnection();
        await database.beginTransaction();

        const id = req.params.id;
        const sql1 = "SELECT gambar FROM media WHERE postingan_id = ?";
        const [getAllMedia] = await database.query(sql1, [id]);
        
        await Promise.all(getAllMedia.map((media) => 
            fs.unlink(`uploads/${media.gambar}`).catch(() => {} ) 
        ));
        
        const sql2 = "DELETE FROM media WHERE postingan_id = ?";
        await database.query(sql2, [id]);

        const sql3 = "DELETE FROM komentar WHERE postingan_id = ?"
        await database.query(sql3, [id]);
    
        const sql4 = "DELETE FROM postingan WHERE id = ?";
        await database.query(sql4, [id]);

        await database.commit();
        res.status(200).json({ status: 200, msg: "POSTINGAN BERHASIL DIHAPUS" });
    } 
    catch (error) {
        if (database) await database.rollback();
        res.status(500).json({ status: 500, msg: "INTERNAL SERVER ERROR" });
    }
    finally {
        if (database) database.release();
    }
}

const deleteAllUserPost = async (req, res) => {
    let database;
    try {
        database = await db.getConnection();
        await database.beginTransaction();

        const userId = req.user.id;
        const sql1 = `SELECT media.id, media.gambar AS gambar 
            FROM media JOIN postingan ON media.postingan_id = postingan.id
            WHERE postingan.user_id = ?`;
        const [mediaRecords] = await database.query(sql1, [userId]);

        await Promise.all(mediaRecords.map((media) => 
            fs.promises.unlink(`uploads/${media.gambar}`).catch(() => {/* ignore error */})
        ));

        const sql2 = `DELETE media FROM media 
            JOIN postingan ON media.postingan_id = postingan.id 
            WHERE postingan.user_id = ?`;
        await database.query(sql2, [userId]);

        const sql3 = `DELETE komentar FROM komentar 
            JOIN postingan ON komentar.postingan_id = postingan.id 
            WHERE postingan.user_id = ?`;
        await database.query(sql3, [userId]);
        
        const sql4 = "DELETE FROM postingan WHERE user_id = ?";
        await database.query(sql4, [userId]);

        await database.commit();
        res.status(200).json({ status: 200, msg: "SEMUA POSTINGAN BERHASIL DIHAPUS" });
    } 
    catch (error) {
        if (database) await database.rollback();
        res.status(500).json({ status: 500, msg: "INTERNAL SERVER ERROR" });
    }
    finally {
        if (database) database.release();
    }
}

export { 
    addPost, getAllPost, getDataByFilter, getPersonalPost, 
    getUserPost, deleteAllUserPost, deletePost, selectPost 
}
