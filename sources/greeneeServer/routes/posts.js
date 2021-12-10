const express = require('express');
const multer = require('multer');
const fs = require('fs');

const { checkPermission } = require('../middlewares/posts');

const Controller = require('../controllers/posts');
const router = express.Router();

try {
	fs.readdirSync('Campaigns');
} catch (error) {
	console.error('Campaigns 폴더 생성');
	fs.mkdirSync('Campaigns');
}

const upload = multer({
	storage: multer.diskStorage({
		destination(req, file, cb) {
			cb(null, 'Campaigns');
		},
		filename(req, file, cb) {
			const ext = path.extname(file.originalname);
			cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
		},
	}),
	limits: {fileSize: 5 * 1024 * 1024 },
});
const upload2 = multer();

// 이미지의 저장 경로를 클라이언트로 응답
router.post('/img_post', upload.single('img'), Controller.UploadImage);

// 캠페인 모두 보여주기 및 작성 (0)
router.route('/')
  .get(Controller.ShowCampaigns)
  .post(upload2.none(), Controller.CreateCampaign);

router.get('/search', Controller.Search);

// 캠페인 소개 편집 및 삭제 (0)
router.route('/:id')
  .get(Controller.Intro)
  .patch(upload2.none(), checkPermission, Controller.PatchCampaign)
  .delete(checkPermission, Controller.DeleteCampaign);

// 캠페인에 달린 댓글 보여주기 (0)
router.get('/:id/comments', Controller.ShowComments);


// 팀원모집

module.exports = router;