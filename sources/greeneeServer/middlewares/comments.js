const { User, Comment } = require('../models');
const { noPermission, noPost, noBoard } = require('./');


// 실제 db에 postId가 존재하는지 (0)
exports.checkPostId = async (req, res, next) => {
	try{
		const post = await Post.findOne({
			where: { id: req.query.postId },
		});
		if(!post) return noPost(req, res);
		res.locals.post = post;
		next();
	} catch (error) {
		console.error(error);
		next(error);
	}
};

// 실제 db에 boradId가 존재하는지 (0)
exports.checkBoardId = async (req, res, next) => {
	try{
		const board = await board.findOne({
			where: { id: req.query.boardId },
		});
		if(!board) return noBoard(req, res);
		res.locals.board = board;
		next();
	} catch (error) {
		console.error(error);
		next(error);
	}
};

// 사용자 접근 권한 있는지 확인 (0)
exports.checkPermission = async (req, res, next) => {
	try{
		const comment = await Comment.findOne({
			where: { 
				id: req.params.id 
			},
		});
		if (req.user.name != comment.commenter) return noPermission(req, res);
		next();
	} catch (error) {
		console.error(error);
		next(error);
	}
};
