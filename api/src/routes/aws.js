const express = require("express");
const router = express.Router();
const { PutObjectCommand } = require("@aws-sdk/client-s3");
const { s3, upload } = require("./controllers/Aws/S3");
const { YOUR_BUCKET } = process.env;

router.post("/", upload.single("file"), async (req, res) => {
    const { originalname, buffer } = req.file;
    const params = {
        Bucket: YOUR_BUCKET,
        Key: originalname,
        Body: buffer,
    };
    const fileKey = Date.now() + "-" + file.originalname;
    try {
        await s3.send(new PutObjectCommand(params));
        const fileUrl = `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileKey}`;
        res.status(201).send({
            message: "Archivo subido con éxito.",
            url: fileUrl, // URL pública del archivo
            key: fileKey, // Key del archivo en el
        });
    } catch (error) {
        res.status(404).send(error.message);
    }
});

module.exports = router;