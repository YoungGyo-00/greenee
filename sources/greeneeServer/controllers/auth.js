const passport = require('passport');
const bcrypt = require('bcrypt');

const User = require('../models/user');

exports.join = async (req, res, next) => {
	const {name, cellphone, id, pwd} = req.body;
	try {
		const exId = await User.findOne({ where: { id } });
		const exPwd = await User.findOne({ where: { pwd } });
		if (exId) {
			console.log('이미 회원인 상태입니다');
			return res.status(400).send('이미 회원인 상태입니다');
		} else if (exPwd) {
			console.log('이미 사용중인 비밀번호입니다');
			return res.status(400).send('이미 사용중인 비밀번호입니다');
		}
		const hash = await bcrypt.hash(pwd, 12);
		await User.create({
			name,
			cellphone,
			id,
			pwd: hash,
		});
		console.log('회원가입 성공');s
		return res.status(201).send('회원가입 성공');
	} catch (error) {
		console.error(error);
		return next(error);
	}
};

// 로그인 (0)
exports.login = async (req, res, next) => {
	passport.authenticate('local', (authError, user, info) => {
		if (authError) {
			console.error(authError);
			return next(authError);
		}
		if (!user) {
			return res.status(400).json('아이디 혹은 비밀번호가 존재하지 않습니다.');
		}
		return req.login(user, (loginError) => {
			if (loginError) {
				console.error(loginError);
				return next(loginError);
			}
			console.log(`${user.name}님 로그인 성공`);
			return res.status(200).send(`${user.name}님 안녕하세요`);
		});
	})(req, res, next);
};

// 로그아웃 (0)
exports.logout = async (req, res) => {
	req.logout();
	req.session.destroy();
	console.log('로그아웃 성공')
	return res.status(200).send('로그아웃 성공');
};