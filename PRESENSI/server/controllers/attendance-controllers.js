import db from "../configs/db-connection.js";

const checkAttendanceTime = () => {
    const now = new Date();
    const day = now.getDay();
    const hour = now.getHours();
    
    // Validasi hari kerja
    if (day === 0 || day === 6) return false;
    
    // Validasi jam check-in
    if (type === 'check-in' && (hour < 7 || hour >= 9)) return false;
    
    return true;
}

const fillAttendance = async (req, res) => {
    let database;
    try {
        database = await db.getConnection();
        database.beginTransaction();

        const userId =  req.user.id;
        const { hariTanggal, status_kehadiran } = req.body;
        const values = [hariTanggal, status_kehadiran, userId];

        if (!checkAttendanceTime()) {
            return res.status(400).json({ 
                status: 400, 
                msg: "Presensi hanya dapat diisi pada hari senin-jumat jam 07.00 - 09.00" 
            });
        }

        const sql = `INSERT INTO kehadiran (hariTanggal, status_kehadiran, pengguna_id) VALUES (?, ?, ?)`;
        const [result] = await database.query(sql, values);

        if (result.length > 0) {
            return res.status(400).json({ status: 400, msg: "Kamu sudah melakukan presensi hari ini" });
        }

        await database.commit();
        res.status(200).json({ status: 200, msg: "Presensi berhasil diisi" });
    } 
    catch (error) {
        if (database) database.rollback();
        res.status(500).json({ status: 500, msg: "INTERNAL SERVER ERROR" });
    }
    finally {
        if (database) database.release();
    }
}

export default fillAttendance;