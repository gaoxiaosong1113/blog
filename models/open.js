var mongodb = require('./db');

function dbOPen(type, data, dataAry) {
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);
        }
        //读取 posts 集合
        db.collection(type, function (err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            //通过用户名、时间及标题查找文档，并把一条留言对象添加到该文档的 comments 数组里
            collection.update(data, {
                $push: dataAry
            }, function (err) {
                mongodb.close();
                if (err) {
                    return callback(err);
                }
                callback(null);
            });
        })
    })
}
module.exports = dbOPen;
