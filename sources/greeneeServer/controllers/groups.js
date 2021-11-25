const sequelize = require('sequelize');

const { User, Comment, Group, Board } = require('../models');
const Op = sequelize.Op;


exports.ShowGroups = async (req, res, next) => {
	try {
		const group = await Group.findAll({
			order: [['createdAt', 'desc']],
		});
		if (group) {
			console.log('모든 그룹 리스트 보여주기');
			return res.status(200).send(group);
		}
	} catch (error) {
		console.error(error);
		next(error);
	}
};

exports.CreateGroup = async (req, res, next) => {
	try {
		const group = await Group.create({
			writer: req.user.nickName,
			title: req.body.title,
		});
		console.log("그룹 생성");
		return res.status(201).json(group);
	} catch (error) {
		console.error(error);
		next(error);
	}
}; 

exports.ShowBoard = async (req, res, next) => {
	try {
		const board = await Board.findAll({
			order: [['createdAt', 'desc']],
			where: { groupId : req.params.id }
		});
		if (board) {
			console.log('모든 게시글 보여주기');
			return res.status(200).json(board);
		}
	} catch (error) {
		console.error(error);
		next(error);
	}
};

exports.CreateBoard = async (req, res, next) => {
	try {
		const board = await Board.create({
			writer: req.user.nickName,
			title: req.body.title,
			content: req.body.content,
			groupId: req.params.id
		});
		console.log("게시글 생성");
		return res.status(201).json(board);
	} catch (error) {
		console.error(error);
		next(error);
	}
};

exports.PatchGroup = async (req, res, next) => {
	try {
		const group = await Group.update({
			title: req.body.title,
		}, {where: { id: req.params.id }});
		console.log("그룹 편집 완료");
		return res.status(201).send('그룹 편집 완료');
	} catch (error) {
		console.error(error);
		next(error);
	}
};

exports.DeleteGroup = async (req, res, next) => {
	try {
		const group = await Group.destroy({
			where: { id: req.params.id },
		});
		console.log("그룹 삭제 완료");
		return res.status(201).send("그룹 삭제 완료");
	} catch (error) {
		console.error(error);
		next(error);
	}
};

exports.ShowComments = async (req, res, next) => {
	try {
		const comment = await Comment.findAll({
			where: { boardId: req.params.id },
			order: [['createdAt', 'desc']],
		});
		console.log("게시글에 달린 댓글 보여주기");
		return res.json(comment);
	} catch (error) {
		console.error(error);
		next(error);
	}
};

exports.PatchBoard = async (req, res, next) => {
	try {
		const board = await Board.update({
			title: req.body.title,
			content: req.body.content
		}, {where: { id: req.params.id }});
		console.log("게시글 편집 완료");
		return res.status(201).send("게시글 편집 완료");
	} catch (error) {
		console.error(error);
		next(error);
	}
};

exports.DeleteBoard = async (req, res, next) => {
	try {
		const board = await Board.destroy({
			where: { id: req.params.id },
		});
		console.log("게시글 삭제 완료");
		return res.status(201).send("게시글 삭제 완료");
	} catch (error) {
		console.error(error);
		next(error);
	}
};

exports.SearchGroup = async (req, res, next) => {
	try{
		const searchText = req.query.searchText;
		
		const result = await Group.findAll({
			where: {
				title: {
					[Op.like]: '%'+searchText+'%'
				}
			}
		});
		console.log("그룹 검색");
		return res.status(200).json(result);
	} catch (error) {
		console.error(error);
		next(error);
	}
};

exports.SearchBoard = async (req, res, next) => {
	try{
		const searchText = req.query.searchText;
		
		const result = await Board.findAll({
			where: {
				title: {
					[Op.like]: '%'+searchText+'%'
				}
			}
		});
		console.log("게시글 검색");
		return res.status(200).json(result);
	} catch (error) {
		console.error(error);
		next(error);
	}
};