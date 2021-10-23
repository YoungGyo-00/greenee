const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('../middlewares');

const Controller = require('../controllers/auth');
const router = express.Router();

router.use((req, res, next) => {
	res.locals.user = req.user;
	next();
});

// 회원가입 (0)
router.post('/join', isNotLoggedIn, Controller.join);

// 로그인 (0)
router.post('/login', isNotLoggedIn, Controller.login);

// 로그아웃 (0)
router.get('/logout', isLoggedIn, Controller.logout);

module.exports = router;