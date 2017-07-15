var express = require('express');
var router = express.Router();

//user控制器，MVC结构的C层。
var user_controller = require('../controller/userCtrl');

router.post('/login', function(req, res, next) {
    user_controller.login(req, res, next);
});
router.get('/addUser', function(req, res, next) {
    user_controller.add(req, res, next);
});
module.exports = router;