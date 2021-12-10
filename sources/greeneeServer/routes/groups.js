const express = require('express');

const { checkPermission, checkEnterPermission } = require('../middlewares/groups');

const Controller = require('../controllers/groups');
const router = express.Router();

// 검색
router.get('/search', Controller.SearchGroup);
router.get('/search/:id', Controller.SearchBoard);

// 그룹 보여주기 및 만들기
router.route('/')
  .get(Controller.ShowGroups)
  .post(Controller.CreateGroup);

// 그룹에 들어가기, 게시글 올리기, 그룹 수정, 삭제
router.route('/:id')
  .get(Controller.ShowBoard)
  .post(Controller.CreateBoard)
  .patch(checkPermission, Controller.PatchGroup)
  .delete(checkPermission, Controller.DeleteGroup);

// 게시글에 달려있는 댓글 보기, 수정, 삭제
router.route('/:id/:id_E')
  .get(Controller.ShowComments)
  .patch(checkEnterPermission, Controller.PatchBoard)
  .delete(checkEnterPermission, Controller.DeleteBoard);

module.exports = router;