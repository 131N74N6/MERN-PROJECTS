import db from "../config/db-connection.js";
import fs from "fs-extra";

const getAllPost = async (req, res) => {
    try {
        const sql = `
            SELECT postingan.id, postingan.caption, JSON_ARRAYAGG(media.gambar) AS gambar
            FROM postingan
            LEFT JOIN media ON postingan.id = media.postingan_id 
            GROUP BY postingan.id`;
        const [result] = await db.query(sql);
        res.json({ status: 200, data: result });
    } 
    catch (error) {
        res.json({ status: 500, msg: "INTERNAL SERVER ERROR" });
    }
}

const addPost = async (req, res) => {
    let database;
    try {
        database = await db.getConnection();
        await database.beginTransaction();

        const { caption } = req.body; 
        const files = req.files || null;

        const sql1 = "INSERT INTO postingan (caption) VALUES (?)";
        const sql2 = "INSERT INTO media (gambar, postingan_id) VALUES (?, ?)";

        if (!caption?.trim() || !files?.length) {
            return res.json({ status: 400, msg: "DATA BELUM LENGKAP" });
        }

        const [result] = await database.query(sql1, [caption]);
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
        res.json({ status: 500, msg: "INTERNAL SERVER ERROR" });
    }
    finally {
        if (database) database.release();
    }
}

const selectPost = async (req, res) => {
    try {        
        const sql = `
            SELECT 
                postingan.id AS post_id,
                postingan.caption,
                JSON_ARRAYAGG(media.gambar) AS gambar
            FROM postingan 
            LEFT JOIN media ON postingan.id = media.postingan_id 
            WHERE postingan.id = ?`;
        const id = req.params.id;
        const [result] = await db.query(sql, [id]);

        res.json({ status: 200, data: result });
    } 
    catch (error) {
        res.json({ status: 500, msg: "INTERNAL SERVER ERROR" });
    }
}

const deletePost = async (req, res) => {
    let database;
    try {
        database = await db.getConnection();
        await database.beginTransaction();

        const sql1 = "SELECT gambar FROM media WHERE postingan_id = ?";
        const sql2 = "DELETE FROM postingan WHERE id = ?";
        const sql3 = "DELETE FROM media WHERE postingan_id = ?";

        const id = req.params.id;
        const [getAllMedia] = await database.query(sql1, [id]);

        await Promise.all(getAllMedia.map((media) => 
            fs.unlink(`uploads/${media.gambar}`).catch(() => {} ) 
        ));

        await database.query(sql2, [id]);
        await database.query(sql3, [id]);
        await database.commit();
        res.json({ status: 200, msg: "POSTINGAN BERHASIL DIHAPUS" });
    } 
    catch (error) {
        if (database) await database.rollback();
        res.json({ status: 500, msg: "INTERNAL SERVER ERROR" });
    }
    finally {
        if (database) database.release();
    }
}

const deleteAllPost = async (req, res) => {
    let database;
    try {
        database = await db.getConnection();
        await database.beginTransaction();

        const sql1 = "SELECT gambar, postingan_id FROM media";
        const [mediaRecords] = await database.query(sql1);

        await Promise.all(mediaRecords.map((media) => 
            fs.promises.unlink(`uploads/${media.gambar}`).catch(() => {/* ignore error */})
        ));

        const sql2 = "DELETE FROM media";
        await database.query(sql2);
        
        const sql3 = "DELETE FROM postingan";
        await database.query(sql3);

        // Reset auto increment
        await database.query("ALTER TABLE media AUTO_INCREMENT = 1");
        await database.query("ALTER TABLE postingan AUTO_INCREMENT = 1");

        await database.commit();
        res.json({ status: 200, msg: "SEMUA POSTINGAN BERHASIL DIHAPUS" });
    } 
    catch (error) {
        if (database) await database.rollback();
        console.error("Error:", error);
        res.status(500).json({ status: 500, msg: "INTERNAL SERVER ERROR" });
    }
    finally {
        if (database) database.release();
    }
}

export { addPost, getAllPost, selectPost, deleteAllPost, deletePost }
