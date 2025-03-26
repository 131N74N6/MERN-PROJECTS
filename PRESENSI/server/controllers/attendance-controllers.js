import db from "../configs/db-connection.js";

const fillAttendance = async (req, res) => {
    let database;
    try {
        database = await db.getConnection();
        database.beginTransaction();

        const userId =  req.user.id;
        const { hariTanggal, status_kehadiran } = req.body;
        const values = [hariTanggal, status_kehadiran, userId];

        const sql = `INSERT INTO kehadiran (hariTanggal, status_kehadiran, pengguna_id) VALUES (?, ?, ?)`;
        await database.query(sql, values);

        await database.commit();
        res.status(200).json({ status: 200, msg: "Presensi berhasil diisi" });
    } catch (error) {
        if (database) database.rollback();
        res.status(500).json({ status: 500, msg: "INTERNAL SERVER ERROR" });
    }
    finally {
        if (database) database.release();
    }
}

export default fillAttendance;