const express = require('express');
const { User, Comment, Post } = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const router = express.Router();

// 댓글 생성 기능 ex) /comments?postId=20
router.post('/', isLoggedIn, checkPostId, (async (req, res, next) => { 
	try {
		const comment = await Comment.create({
			postId: req.post.id,
			commenter: req.user.name,
			comment: req.body.comment,
		});
		console.log("댓글 생성 완료");
		return res.status(201).send('댓글 생성 완료');
	} catch (error) {
		console.error(error);
		next(error);
	}
}));

// 댓글 수정 및 삭제 기능 /comments/:id?postId=20 
router.route('/:id', isLoggedIn, checkPostId, checkPermission)
  .patch(async (req, res, next) => {
	try {
		const result = await Comment.update({
			comment: req.body.comment,
		}, {
			where: { 
				postId: req.query.postId,
				id: req.params.id,
			},
		});
		console.log('수정 완료');
		return res.status(201).send('수정 완료');
	} catch (error) {
		console.error(error);
		next(error);
	}
})
  .delete(async (req, res, next) => {
	try {
		const result = await Comment.destroy({ 
			where: {
				postId: req.query.postId,
				id: req.params.id,
			}
		});
		console.log('삭제 완료');
		return res.status(200).send('삭제 완료');
	} catch (error) {
		console.error(error);
		next(error);
	}
});

module.exports = router;

// 실제 db에 postId가 존재하는지 체크 쿼리를 postId로 줘야한다.
function checkPostId (req, res, next) {
	const postId = Post.findOne({
		where: { id: req.query.postId },
	}, (err, post) => {
		if (err) return res.json(err);
		res.locals.post = post;
		next();
	});
}

// 사용자 접근 권한 있는지 확인
function checkPermission(req, res, next) {
	const comment = Comment.findOne({
		where: { 
			id: req.params.id 
		},
		attributes: 'commenter',
	}, (err, comment) => {
		if (err) return res.json(err);
		if (req.user.name != comment.commenter) return noPermission(req, res);
		next();
	});
}
