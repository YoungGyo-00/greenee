const { Post, User } = require('../models');
const { noPermission } = require('./');

// 사용자 접근 권한 있는지 확인 (0)
exports.checkPermission = async (req, res, next) => {
	try{
		const post = await Post.findOne({
			where: {id: req.params.id},
		});
		if (req.user.name != post.writer) return noPermission(req, res);
		next();
	} catch (error) {
		console.error(error);
		next(error);
	}
};