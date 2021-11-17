const express = require('express');
const { checkPermission, checkPostId, checkBoardId } = require('../middlewares/comments');

const Controller = require('../controllers/comments');
const router = express.Router();

// 캠페인 댓글 생성 기능 (0)
router.post('/post', checkPostId, Controller.CreatePost);
router.post('/board', checkBoardId, Controller.CreateBoard);

// 캠페인 댓글 수정 및 삭제 기능 (0)
router.route('/:id')
  .patch(checkPermission, Controller.PatchComment)
  .delete(checkPermission, Controller.DeleteComment);

module.exports = router;