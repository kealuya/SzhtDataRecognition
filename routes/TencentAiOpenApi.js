const crypto = require('crypto');
const request = require('superagent');
const app_key = "aidmPj1C6OI6FaN5";
const app_id = "1106894367";
const nonce_str = "szht";

const url_ocr_generalocr = "https://api.ai.qq.com/fcgi-bin/ocr/ocr_generalocr";
var initFunction = function () {

    //通用参数方法
    var getParamsJson = function () {
        var now = Math.round(new Date().getTime() / 1000);
        var apiParamsJson = {
            app_id: app_id,
            time_stamp: now,
            nonce_str: nonce_str,
            sign: ''
        };
        return apiParamsJson;
    }
    //通用签名方法
    var getReqSign = function (paramJson) {
        var array = new Array();
        for (var key in paramJson) {
            if (paramJson[key] != '') {
                array.push(key);
            }
        }
        array.sort();
        var str = "";
        for (var i = 0; i < array.length; i++) {
            str += "" + array[i] + "=" + encodeURIComponent(paramJson[array[i]]);
            str += "&"
        }
        str = str + "app_key=" + app_key;
        var md5 = crypto.createHash('md5');
        var code = md5.update(str, 'utf-8').digest("hex");
        code = code.toUpperCase();
        return code;
    }
    //通用接口请求
    var requestApiPromise = function (url, paramJson) {
        return request.post(url)
            .type('form')
            .send(paramJson)
    }
    //通用OCR识别
    var ocrGeneralocr = function (image_base64) {
        var paramJson = getParamsJson();
        paramJson.image = image_base64;
        paramJson.sign = getReqSign(paramJson);
        //返回Promise对象
        return requestApiPromise(url_ocr_generalocr, paramJson);
    }

    return {
        //通用OCR接口
        ocrGeneralocr: ocrGeneralocr
        //追加其他接口
    };
}();

module.exports = initFunction;