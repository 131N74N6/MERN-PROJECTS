import db from "../configs/db-connection.js";

const signIn = async (req, res) => {
    try {
        const { username, kata_sandi } = req.body;
        if (!username.trim() || !kata_sandi.trim()) {
            return res.status(400).json({ status: 400, msg: "Data belum lengkap!" });
        }

        const sql = `SELECT * FROM pengguna WHERE username = ?`;
        const [result] = await db.query(sql, [username.toLowerCase()]);

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

export { changeUserData, signIn }