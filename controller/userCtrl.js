var pool = require('../conf/conn');
var user_model = require('../model/userModel');
// 向前台返回JSON
var callback = function (res, ret) {
    if(typeof ret === 'undefined') {
        res.json({
            code:'-1',
            msg: '操作失败'
        });
    } else{
        res.json(ret);
    }
};
module.exports = {
    login:function(req,res){
        var param = req.body;
//这里假设用户名密码，实际操作需要数据库拉取数据。
        var user={
            name:"hello",
            passwd:"123"
        };
//如果验证通过
        if(param.username == user.name && param.password==user.passwd){
//存储session，并将sessionID写回到客户端
            req.session.user=user;

            callback(res, {code:200,msg:'success'});
        }


    },
//添加数据的方法
    add: function (req, res) {
//获取连接
        pool.getConnection(function(err, connection) {
// 获取前台页面传过来的参数
            var param = req.query || req.params;
//执行插入语句
            connection.query(user_model.insert, [param.name, param.age], function(err, result) {
                if(result) {
                    result = {
                        code: 200,
                        msg:'成功增加一条数据'
                    };
                }
//返回结果
                callback(res, result);
// 释放连接
                connection.release();
            });
        });
    },
    test:function(req,res){
//验证是否有了session
        var userInfo = req.session.user;
        console.log(userInfo);
        callback(res, {code:200,msg:'welcome!'});

    }
};