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

exports.noPost = (req, res) => {
	res.status(403).send('캠페인이 없습니다');
};

exports.noBoard = (req, res) => {
	res.status(403).send('게시글이 없습니다');
};