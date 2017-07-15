var express = require('express');
var router = express.Router();

//user控制器，MVC结构的C层。
var cate_controller = require('../controller/cateCtrl');
//批量增加顶级分类
router.post('/addTopCate', function(req, res, next) {

    cate_controller.addTop(req, res, next);
});

//查询所有分类
router.get('/allCate', function(req, res, next) {

    cate_controller.select(req, res, next);
});
//增加分类
router.post('/addCate', function(req, res, next) {

    cate_controller.add(req, res, next);
});
//更新分类
router.post('/updateCate', function(req, res, next) {
    cate_controller.update(req, res, next);
});
//删除分类
router.get('/delCate', function(req, res, next) {
    cate_controller.delete(req, res, next);
});

module.exports = router;