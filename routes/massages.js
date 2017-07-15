var express = require('express');
var router = express.Router();
var user_controller = require('../controller/userCtrl');
/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});
//前台发布留言
router.post('/addMessage', function(req, res, next) {
    user_controller.addMessage(req, res, next);
});
//前台显示审核后的留言。
router.get('/showMessage', function(req, res, next) {
    user_controller.showMessage(req, res, next);
});
router.get('/list', function(req, res, next) {
    user_controller.list(req, res, next);
});
router.get('/judge', function(req, res, next) {
    user_controller.judge(req, res, next);
});
router.get('/del', function(req, res, next) {
    user_controller.del(req, res, next);
});

module.exports = router;