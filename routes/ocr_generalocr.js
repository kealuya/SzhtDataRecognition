var express = require('express');
var router = express.Router();
const fs = require('fs');
const aojm = require('./AiOpenJsonMaker');
const taoa = require('./TencentAiOpenApi');

router.get('/test', function (req, res, next) {
    var bitmap = fs.readFileSync('routes/搜狗截图17年11月25日1512_1.png');
    var img_base64 = new Buffer(bitmap).toString('base64');
    aojm.AiOpenJsonMaker_ocr_generalocr(taoa.ocrGeneralocr(img_base64))(res);
});

router.post('/ocr_generalocr', function (req, res, next) {
    var imgbase64 = req.body.imgbase64;
    aojm.AiOpenJsonMaker_ocr_generalocr(taoa.ocrGeneralocr(imgbase64))(res);
});

module.exports = router;