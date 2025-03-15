import db from "../config/db-connection.js";

const showAllComments = async (req, res) => {
    try {
        const id = req.params.id;
        const sql = `
            SELECT
                komentar.id,
                komentar.komen AS tanggapan,
                komentar.created_at AS waktu,
                pengguna.id AS id_pengguna,
                pengguna.username AS nama_pengguna
            FROM komentar 
            JOIN user AS pengguna ON komentar.user_id = pengguna.id
            WHERE komentar.postingan_id = ? 
            ORDER BY waktu DESC`;
        const [result] = await db.query(sql, [id]);
        res.status(200).json({ status: 200, data: result });
    } 
    catch (error) {
        res.status(500).json({ status: 500, msg: "INTERNAL SERVER ERROR" });
    }
}

const makeComment = async (req, res) => {
    let database;
    try {
        database = await db.getConnection();
        await database.beginTransaction();

        const { komen, postingan_id } = req.body;
        const userId = req.user.id;

        if (!komen.trim()) {
            return res.status(400).json({ status: 400, msg: "HARAP ISI KOMENTAR" });
        }
        const sql = "INSERT INTO komentar (komen, postingan_id, user_id) VALUES (?, ?, ?)";
        const values = [komen, postingan_id, userId];

        await database.query(sql, values);
        await database.commit();
        res.status(200).json({ status: 200, msg: "KOMENTAR BERHASIL DITAMBAHKAN" });
    } 
    catch (error) {
        if (database) await database.rollback();
        res.status(500).json({ status: 500, msg: "INTERNAL SERVER ERROR" });
    }
    finally {
        if (database) database.release();
    }
}

export { makeComment, showAllComments }