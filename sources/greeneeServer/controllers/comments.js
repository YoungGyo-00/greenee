const { User, Comment, Post } = require('../models');

// 댓글 생성(0)
exports.CreatePost = async (req, res, next) => { 
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
};

// 댓글 수정(0)
exports.PatchPost = async (req, res, next) => {
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
};

// 댓글 삭제(0)
exports.DeletePost = async (req, res, next) => {
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
};