const express = require('express');
const multer = require('multer');
const fs = require('fs');
const sequelize = require('sequelize');

const { User, Comment, Post } = require('../models');
const { isLoggedIn, isNotLoggedIn, noPermission } = require('./middlewares');
const Op = sequelize.Op;

const router = express.Router();

try {
	fs.readdirSync('uploads');
} catch (error) {
	console.error('uploads 폴더 생성');
	fs.mkdirSync('uploads');
}

const upload = multer({
	storage: multer.diskStorage({
		destination(req, file, cb) {
			cb(null, 'uploads');
		},
		filename(req, file, cb) {
			const ext = path.extname(file.originalname);
			cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
		},
	}),
	limits: {fileSize: 5 * 1024 * 1024 },
});


// 이미지의 저장 경로를 클라이언트로 응답
router.post('/img', upload.single('img'), (req, res) => {
	console.log(req.file);
	res.json({ url: `/img/${req.file.filename}` });
})

// 캠페인 모두 보여주기 (0)
router.get('/', async (req, res, next) => {
	try {
		const post = await Post.findAll({
			order: [['createdAt', 'desc']],
		});
		if (post) {
			console.log('모든 캠페인 리스트 보여주기');
			return res.status(200).send(post);
		}
	} catch (error) {
		console.error(error);
		next(error);
	}
}); 

// 캠페인 작성 (0)
const upload2 = multer();
router.post('/', upload2.none(), async (req, res, next) => {
	try {
		const post = await Post.create({
			poster: req.user.name,
			title: req.body.title,
			content: req.body.content,
			img: req.body.url,
		});
		console.log("캠페인 생성");
		return res.status(201).json(post);
	} catch (error) {
		console.error(error);
		next(error);
	}
});

// 캠페인 편집 (0)
router.patch('/:id', upload2.none(), checkPermission, async (req, res, next) => {
	try {
		const result = await Post.update({
			title: req.body.title,
			content: req.body.content,
			img: req.body.url
		}, {where: { id: req.params.id }});
		console.log("캠페인 편집 완료");
		return res.status(201).send('캠페인 편집 완료');
	} catch (error) {
		console.error(error);
		next(error);
	}
});

// 캠페인 삭제 (0)
router.delete('/:id', checkPermission, async (req, res, next) => {
	try {
		const result = await Post.destroy({
			where: { id: req.params.id },
		});
		console.log("캠페인 삭제 완료");
		return res.status(201).send("캠페인 삭제 완료");
	} catch (error) {
		console.error(error);
		next(error);
	}
});

// 캠페인 소개 눌렀을 떄 (0)
router.get('/intro/:id', async (req, res, next) => {
	try{
		const post = await Post.findOne({
			where: { id: req.params.id }
		});
		console.log("캠페인 소개");
		return res.json(post);
	} catch (error) {
		console.error(error);
		next(error);
	}
});

// 캠페인에 달린 댓글 보여주기 (0)
router.get('/:id/comments', async (req, res, next) => {
	try {
		const comment = await Comment.findAll({
			where: { postId: req.params.id },
			order: [['createdAt', 'desc']],
		});
		console.log("캠페인에 달린 댓글 보여주기");
		return res.json(comment);
	} catch (error) {
		console.error(error);
		next(error);
	}
});


// 팀원모집


// 검색창 (0)
router.get('/search', async (req, res, next) => {
	try{
		const searchType = req.query.searchType;
		const searchText = req.query.searchText;
		
		if (searchType == 'title') {
			const result = await Post.findAll({
				where: {
					title: {
						[Op.like]: '%'+searchText+'%'
					}
				}
			});
			console.log(result);
			return res.status(200).json(result);
		} else if (searchType == 'poster') {
			const result = await Post.findAll({
				where: {
					poster: {
						[Op.like]: '%'+searchText+'%'
					}
				}
			});
			console.log(result);
			return res.status(200).json(result);
		}
	} catch (error) {
		console.error(error);
		next(error);
	}
});

module.exports = router;


// 접근 권한 확인용 (0)
async function checkPermission(req, res, next) {
	try{
		const post = await Post.findOne({
			where: {id: req.params.id},
		});
		if (req.user.name != post.poster) return noPermission(req, res);
		next();
	} catch (error) {
		console.error(error);
		next(error);
	}
};