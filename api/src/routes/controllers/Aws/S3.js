const { S3Client } = require("@aws-sdk/client-s3");
const { YOUR_ACCESS_KEY_ID, YOUR_SECRET_ACCESS_KEY, YOUR_REGION } = process.env;
const multer = require("multer");

const s3 = new S3Client({
  credentials: {
    accessKeyId: YOUR_ACCESS_KEY_ID,
    secretAccessKey: YOUR_SECRET_ACCESS_KEY,  
  },
  region: YOUR_REGION,
});

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error("Error: Archivo debe ser una imagen valida"));
    },
});

module.exports = {
    s3,
    upload,
};