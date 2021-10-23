const sequelize = require('sequelize');

const { User, Comment, Post } = require('../models');
const Op = sequelize.Op;

// 이미지의 저장 경로를 클라이언트로 응답
exports.UploadImage = async (req, res) => {
	console.log(req.file);
	res.json({ url: `/img/${req.file.filename}` });
};

// 캠페인 모두 보여주기 (0)
exports.ShowCampaigns = async (req, res, next) => {
	try {
		const post = await Post.findAll({
			order: [['createdAt', 'desc']],
		});
		if (post) {
			console.log('모든 캠페인 리스트 보여주기');
			return res.status(200).send(post);
		}
	} catch (error) {
		console.error(error);
		next(error);
	}
}; 

// 캠페인 작성 (0)
exports.CreateCampaign = async (req, res, next) => {
	try {
		const post = await Post.create({
			poster: req.user.name,
			title: req.body.title,
			content: req.body.content,
			img: req.body.url,
		});
		console.log("캠페인 생성");
		return res.status(201).json(post);
	} catch (error) {
		console.error(error);
		next(error);
	}
};

// 캠페인 편집 (0)
exports.PatchCampaign = async (req, res, next) => {
	try {
		const result = await Post.update({
			title: req.body.title,
			content: req.body.content,
			img: req.body.url
		}, {where: { id: req.params.id }});
		console.log("캠페인 편집 완료");
		return res.status(201).send('캠페인 편집 완료');
	} catch (error) {
		console.error(error);
		next(error);
	}
};

// 캠페인 삭제 (0)
exports.DeleteCampaign = async (req, res, next) => {
	try {
		const result = await Post.destroy({
			where: { id: req.params.id },
		});
		console.log("캠페인 삭제 완료");
		return res.status(201).send("캠페인 삭제 완료");
	} catch (error) {
		console.error(error);
		next(error);
	}
};

// 캠페인 소개 눌렀을 떄 (0)
exports.Intro = async (req, res, next) => {
	try{
		const post = await Post.findOne({
			where: { id: req.params.id }
		});
		console.log("캠페인 소개");
		return res.json(post);
	} catch (error) {
		console.error(error);
		next(error);
	}
};

// 캠페인에 달린 댓글 보여주기 (0)
exports.ShowComments = async (req, res, next) => {
	try {
		const comment = await Comment.findAll({
			where: { postId: req.params.id },
			order: [['createdAt', 'desc']],
		});
		console.log("캠페인에 달린 댓글 보여주기");
		return res.json(comment);
	} catch (error) {
		console.error(error);
		next(error);
	}
};


// 팀원모집


// 검색창 (0)
exports.Search = async (req, res, next) => {
	try{
		const searchType = req.query.searchType;
		const searchText = req.query.searchText;
		
		if (searchType == 'title') {
			const result = await Post.findAll({
				where: {
					title: {
						[Op.like]: '%'+searchText+'%'
					}
				}
			});
			console.log(result);
			return res.status(200).json(result);
		} else if (searchType == 'poster') {
			const result = await Post.findAll({
				where: {
					poster: {
						[Op.like]: '%'+searchText+'%'
					}
				}
			});
			console.log(result);
			return res.status(200).json(result);
		}
	} catch (error) {
		console.error(error);
		next(error);
	}
};
