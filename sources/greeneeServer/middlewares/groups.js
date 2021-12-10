const { Group, User, Board } = require('../models');
const { noPermission } = require('./');

exports.checkPermission = async (req, res, next) => {
	try{
		const group = await Group.findOne({
			where: {id: req.params.id},
		});
		if (req.user.name != group.writer) return noPermission(req, res);
		next();
	} catch (error) {
		console.error(error);
		next(error);
	}
};

exports.checkEnterPermission = async (req, res, next) => {
	try{
		const board = await Board.findOne({
			where: {id: req.params.id_E},
		});
		if (req.user.name != board.writer) return noPermission(req, res);
		next();
	} catch (error) {
		console.error(error);
		next(error);
	}
};