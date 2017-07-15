var express = require('express');
var path = require('path');

var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');//cookie中间件
var session = require('express-session');//session中间件
var bodyParser = require('body-parser');//post解析

var index = require('./routes/index');
var users = require('./routes/users');//路由
var cate = require('./routes/cate');
var app = express();

// 配置环境变量
// 视图/模板引擎相关
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));

//配置session和cookie
app.use(cookieParser('sessiontest'));
app.use(session({
    secret: 'sessiontest',//名字与cookieParser中的一致
    resave: true,
    saveUninitialized:true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('login.html');
});

app.use('/cate', cate);

module.exports = app;
