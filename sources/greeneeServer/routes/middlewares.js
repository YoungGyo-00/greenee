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