var AiOpenJsonMaker_ocr_generalocr = (promise) => (res) => {

    promise.then(function (sres) {
        var returnJson = JSON.parse(sres.text);
        if (returnJson.ret == 0) {
            //success
            var item_list = returnJson.data.item_list;
            // {'姓':0.998497,'名':0.99587}
            var itemInfoArray = item_list.map(function (val, ind, arr) {
                var itemString = val.itemstring;
                var itemConfidence = {};
                val.words.forEach(v => {
                    itemConfidence[v.character] = v.confidence;
                });
                return {
                    'itemString': itemString,
                    'itemConfidenceObj': itemConfidence
                };
            });
            console.log(itemInfoArray);
            res.send(itemInfoArray);
        } else {
            //error
            res.JSON({ error_code: returnJson.ret, msg: returnJson.msg });
        }
    }).catch(function(err){
        res.JSON(err);
    });
}

var AiOpenJsonMaker_ocr_generalocr_getJson = (promise) => (res) => {

    promise.then(function (sres) {
        var returnJson = JSON.parse(sres.text);
        if (returnJson.ret == 0) {
            //success
            var item_list = returnJson.data.item_list;
            // {'姓':0.998497,'名':0.99587}
            var itemInfoArray = item_list.map(function (val, ind, arr) {
                var itemString = val.itemstring;
                var itemConfidence = {};
                val.words.forEach(v => {
                    itemConfidence[v.character] = v.confidence;
                });
                return {
                    'itemString': itemString,
                    'itemConfidenceObj': itemConfidence
                };
            });
            console.log(itemInfoArray);
            res.render('result',{'returnJson':JSON.stringify(itemInfoArray)});
        } else {
            //error
            res.JSON({ error_code: returnJson.ret, msg: returnJson.msg });
        }
    }).catch(function(err){
        res.JSON(err);
    });
}


module.exports = {
    'AiOpenJsonMaker_ocr_generalocr': AiOpenJsonMaker_ocr_generalocr,
    'AiOpenJsonMaker_ocr_generalocr_getJson':AiOpenJsonMaker_ocr_generalocr_getJson
}
