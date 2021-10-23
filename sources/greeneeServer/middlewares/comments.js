const { User, Comment } = require('../models');
const { noPermission } = require('./');

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
