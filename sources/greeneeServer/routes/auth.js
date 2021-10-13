const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const User = require('../models/user');

const router = express.Router();

router.use((req, res, next) => {
	res.locals.user = req.user;
	next();
});

router.post('/join', isNotLoggedIn, async (req, res, next) => {
	const {name, cellphone, id, pwd} = req.body;
	try {
		const exUser = await User.findOne({ where: {id} });
		if (exUser) {
			console.log('이미 회원인 상태입니다');
			return res.status(400).send('이미 회원인 상태입니다');
		}
		const hash = await bcrypt.hash(pwd, 12);
		await User.create({
			name,
			cellphone,
			id,
			pwd: hash,
		});
		console.log('회원가입 성공');
		return res.status(201).send('회원가입 성공');
	} catch (error) {
		console.error(error);
		return next(error);
	}
});

router.post('/login', isNotLoggedIn, (req, res, next) => {
	passport.authenticate('local', (authError, user, info) => {
		if (authError) {
			console.error(authError);
			return next(authError);
		}
		if (!user) {
			return res.redirect(`/?loginError=${info.message}`);
		}
		return req.login(user, (loginError) => {
			if (loginError) {
				console.error(loginError);
				return next(loginError);
			}
			console.log('로그인 성공');
			return res.status(200).send('로그인 성공');
		});
	})(req, res, next);
});

router.get('/logout', isLoggedIn, (req, res) => {
	req.logout();
	req.session.destroy();
	console.log('로그아웃 성공')
	return res.status(200).send('로그아웃 성공');
});

module.exports = router;