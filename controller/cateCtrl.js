var pool = require('../conf/conn');
var cate_model = require('../model/cateModel');
// 向前台返回JSON
var callback = function (res, ret) {
    if(typeof ret === 'undefined') {
        res.json({
            code:'-1',
            msg: '操作失败'
        });
    } else {
        res.json(ret);
    }
};

module.exports = {
    addTop:function(req,res){
        pool.getConnection(function(err, connection) {
// 获取前台页面传过来的参数
// console.log(req.body);

//执行插入语句
            var data = req.body['items[]'];
// console.log(typeof data);
            if(typeof data=='string'){
                connection.query(cate_model.insert, [data,0], function(err, result) {
                    var result = {
                        code: 200,
                        msg:'插入成功'
                    };
//返回结果
                    callback(res, result);

// 释放连接
                    connection.release();
                });
            }else{
                for(var i=0;i<data.length;i++){
                    var name = data[i];
                    connection.query(cate_model.insert, [name,0], function(err, result) {

                    });
                    if(i==(data.length-1)){
                        var result = {
                            code: 200,
                            msg:'插入成功'
                        };
//返回结果
                        callback(res, result);

// 释放连接
                        connection.release();
                    }else{
                        continue;
                    }
                }
            }

        });
    },
    select:function(req,res){
        pool.getConnection(function(err, connection) {

            connection.query(cate_model.select,[], function(err, result) {
//console.log(result);
                if(result) {
                    result = {
                        code: 200,
                        res:result,
                        msg:'查询成功'
                    };
                }
//返回结果
                callback(res, result);

// 释放连接
                connection.release();
            });
        });
    },
    add: function (req, res) {
//获取连接
        pool.getConnection(function(err, connection) {
// 获取前台页面传过来的参数
// console.log(req.body.name);
// console.log(req.body.pid);
//执行插入语句
            connection.query(cate_model.insert, [req.body.name,req.body.pid], function(err, result) {
// console.log(result);
                if(result) {
                    result = {
                        code: 200,
                        id:result.insertId,
                        msg:'add ok'
                    };
                }
//返回结果
                callback(res, result);

// 释放连接
                connection.release();
            });
        });
    },
    update: function (req, res) {
//获取连接
        pool.getConnection(function(err, connection) {
// 获取前台页面传过来的参数
            console.log(req.body.name);
            console.log(req.body.pid);

            connection.query(cate_model.update, [req.body.name,req.body.id], function(err, result) {

                if(result) {
                    result = {
                        code: 200,
                        msg:'update ok'
                    };
                }
//返回结果
                callback(res, result);

// 释放连接
                connection.release();
            });
        });
    },
    delete: function (req, res) {
//获取连接
        pool.getConnection(function(err, connection) {

            var param = req.query || req.params;
            connection.query(cate_model.delete, [param.id], function(err, result) {
// console.log(result);
                if(result) {
                    result = {
                        code: 200,
                        msg:'del ok'
                    };
                }
//返回结果
                callback(res, result);

// 释放连接
                connection.release();
            });
        });
    }

};