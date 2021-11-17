const express = require('express');
const multer = require('multer');
const fs = require('fs');

const Controller = require('../controllers');
const router = express.Router();

try {
	fs.readdirSync('Ploggings');
} catch (error) {
	console.error('Plggings 폴더 생성');
	fs.mkdirSync('Ploggings');
}

const upload = multer({
	storage: multer.diskStorage({
		destination(req, file, cb) {
			cb(null, 'Ploggings');
		},
		filename(req, file, cb) {
			const ext = path.extname(file.originalname);
			cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
		},
	}),
	limits: {fileSize: 5 * 1024 * 1024 },
});

// 사진 전송
router.post('/img', upload.single('img'), Controller.UploadImage);

module.exports = router;