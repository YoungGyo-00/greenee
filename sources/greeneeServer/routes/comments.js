const express = require('express');
const { User, Comment, Post } = require('../models');
const { isLoggedIn, isNotLoggedIn, noPermission } = require('./middlewares');

const router = express.Router();

// 댓글 생성 기능 (0)
router.post('/', isLoggedIn, checkPostId, async (req, res, next) => { 
	try {
		const comment = await Comment.create({
			postId: req.query.postId,
			commenter: req.user.name,
			comment: req.body.comment,
		});
		console.log("댓글 생성 완료");
		return res.status(201).send('댓글 생성 완료');
	} catch (error) {
		console.error(error);
		next(error);
	}
});

// 댓글 수정 및 삭제 기능 (0)
router.route('/:id')
  .patch(isLoggedIn, checkPostId, checkPermission, async (req, res, next) => {
	try {
		const result = await Comment.update({
			comment: req.body.comment,
		}, {
			where: { 
				postId: req.query.postId,
				id: req.params.id,
			}
		});
		console.log('수정 완료');
		return res.status(201).send('수정 완료');
	} catch (error) {
		console.error(error);
		next(error);
	}
})
  .delete(isLoggedIn, checkPostId, checkPermission, async (req, res, next) => {
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

// 실제 db에 postId가 존재하는지 (0)
async function checkPostId (req, res, next) {
	try{
		const post = await Post.findOne({
			where: { id: req.query.postId },
		});
		res.locals.post = post;
		next();
	} catch (error) {
		console.error(error);
		next(error);
	}
};

// 사용자 접근 권한 있는지 확인 (0)
async function checkPermission(req, res, next) {
	try{
		const comment = await Comment.findOne({
			where: { 
				id: req.params.id 
			},
		})
		if (req.user.name != comment.commenter) return noPermission(req, res);
		next();
	} catch (error) {
		console.error(error);
		next(error);
	}
};
