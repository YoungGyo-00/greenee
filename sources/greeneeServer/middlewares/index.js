const { Post } = require('../models/post');

exports.isLoggedIn = (req, res, next) => {
	if (req.isAuthenticated()) {
		next();
	} else {
		res.status(403).send('로그인 필요');
	}
};

exports.isNotLoggedIn = (req, res, next) => {
	if (!req.isAuthenticated()) {
		next();
	} else {
		res.status(403).send('이미 로그인 중입니다');
	}
};

exports.noPermission = (req, res) => {
	res.status(403).send('권한이 없습니다');
};

// 실제 db에 postId가 존재하는지 (0)
exports.checkPostId = async (req, res, next) => {
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