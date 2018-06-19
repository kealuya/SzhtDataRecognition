var express = require('express');
var router = express.Router();
const fs = require('fs');
var multiparty = require('multiparty');
const aojm = require('./AiOpenJsonMaker');
const taoa = require('./TencentAiOpenApi');

router.get('/test', function (req, res, next) {
    var bitmap = fs.readFileSync('D:/浩天差旅数据识别/szhtDataRecognition/routes/test.png');
    var img_base64 = new Buffer(bitmap).toString('base64');
    aojm.AiOpenJsonMaker_ocr_generalocr(taoa.ocrGeneralocr(img_base64))(res);
});

router.post('/ocr_generalocr', function (req, res, next) {
    var imgbase64 = req.body.imgbase64;
    aojm.AiOpenJsonMaker_ocr_generalocr(taoa.ocrGeneralocr(imgbase64))(res);
});

router.post('/ocr_generalocr_from_page', function (req, res, next) {

    var dfe = req.body;
    var dfaef = req.files;
    var form = new multiparty.Form();

    form.parse(req, function(err, fields, files) {
        //fields:非文件内容；files：文件内容
        console.log(files.upfile[0].originalFilename);
        console.log(files.upfile[0].path);
        var bitmap = fs.readFileSync(files.upfile[0].path);
        var img_base64 = new Buffer(bitmap).toString('base64');
        aojm.AiOpenJsonMaker_ocr_generalocr_getJson(taoa.ocrGeneralocr(img_base64))(res);
    });
});

module.exports = router;