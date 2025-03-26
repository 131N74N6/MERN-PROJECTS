import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const auth = (req, res, next) => {
    const token = req.cookies.token || req.header.authorization?.split('')[1];

    if (!token) {
        return res.status(401).json({ status: 401, msg: "Akses ditolak. Token tidak ditemukan" });
    }

    try {
        const verified = jwt.verify(token, process.env.SECRET, { algorithms: ['HS256'] });
        req.user = { id: verified.id, username: verified.username, password: verified.password };
        next();
    } 
    catch (error) {
        let statusCode = 401;
        let errorMsg = "Token tidak valid";
        
        if (error instanceof jwt.TokenExpiredError) {
            statusCode = 403;
            errorMsg = "Sesi telah berakhir. Silakan login kembali";
        }
        
        if (error instanceof jwt.JsonWebTokenError) {
            errorMsg = "Token tidak valid";
        }

        return res.status(statusCode).json({ status: statusCode, msg: errorMsg });
    }
}

export default auth;