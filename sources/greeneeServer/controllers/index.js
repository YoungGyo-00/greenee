// 이미지의 저장 경로를 클라이언트로 응답
exports.UploadImage = async (req, res) => {
	console.log(req.file);
	res.json({ url: `/img/${req.file.filename}` });
};