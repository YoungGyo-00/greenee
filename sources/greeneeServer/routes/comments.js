const express = require('express');
const { checkPermission } = require('../middlewares/comments');

const Controller = require('../controllers/comments');
const router = express.Router();

// 댓글 생성 기능 (0)
router.post('/', Controller.CreatePost);

// 댓글 수정 및 삭제 기능 (0)
router.route('/:id')
  .patch(checkPermission, Controller.PatchPost)
  .delete(checkPermission, Controller.DeletePost);

module.exports = router;