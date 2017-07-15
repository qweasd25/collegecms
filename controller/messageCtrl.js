var pool = require('../conf/conn');
var user_model = require('../model/userModel');
module.exports = {
    addMessage:function(req,res) {
        pool.getConnection(function(err, connection) {
            var param = req.body;
            var now = Date.parse(new Date())/1000;//生成时间戳，截止到秒

            connection.query(user_model.insert, [param.phone,param.content,now], function(err, result) {
                console.log(result);
                res.json({
                    code:200,
                    msg:'success'
                });
                connection.release();
            });

        });

    },
    showMessage:function(req,res){
        pool.getConnection(function(err, connection) {

            connection.query(user_model.show, [], function(err, result) {
                console.log(result);
                res.json({
                    code:200,
                    msg:'success',
                    res:result
                });
                connection.release();
            });

        });
    },
    list:function(req,res){
        pool.getConnection(function(err, connection) {

            var now = Date.parse(new Date())/1000;//生成时间戳，截止到秒
            console.log();
            connection.query(user_model.select, [], function(err, result) {
                console.log(result);
                res.json({
                    code:200,
                    msg:'success',
                    res:result
                });
                connection.release();
            });

        });
    },
    judge:function(req,res){
        pool.getConnection(function(err, connection) {

            var param = req.query || req.params;
//注意参数顺序！
            connection.query(user_model.judge, [param.isShow,param.id], function(err, result) {

                res.json({
                    code:200,
                    msg:'success'
                });
                connection.release();
            });

        });
    },
    del:function(req,res){
        pool.getConnection(function(err, connection) {

            var param = req.query || req.params;
//注意参数顺序！
            connection.query(user_model.del, [param.id], function(err, result) {

                res.json({
                    code:200,
                    msg:'success'
                });
                connection.release();
            });

        });
    }
};