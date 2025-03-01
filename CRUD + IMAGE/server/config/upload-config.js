import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now();
        cb(null, `${uniqueSuffix}_${file.originalname}`);
    }
});

const fileFilter = (req, file, cb) => {
    const allowedType = /jpg|jpeg|png/;
    const ext = allowedType.test(path.extname(file.originalname).toLowerCase());
    const mimeType = allowedType.test(file.mimetype);

    if (ext && mimeType) {
        return cb(null, true);
    }
    else {
        return cb(new Error("hanya menerima jpg, jpeg, dan png"));
    }
}

const upload = multer({storage, fileFilter});

export default upload;