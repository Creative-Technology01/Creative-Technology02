var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var PostRouter = require('./routes/Posts/Post');
var AndroidRouter = require('./routes/Posts/Android');
var GadgetsRouter = require('./routes/Posts/Gadgets');
var GamingRouter = require('./routes/Posts/Gaming');
var IOSRouter = require('./routes/Posts/IOS');
var MACRouter = require('./routes/Posts/MAC');
var windowRouter = require('./routes/Posts/window');
var usersRouter = require('./routes/DataBase/users');
// var usersRouter = require('./routes/DataBase/counter');
var session = require('express-session')
var app = express();
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/', PostRouter);
app.use('/', AndroidRouter);
app.use('/', windowRouter);
app.use('/', MACRouter);
app.use('/', IOSRouter);
app.use('/', GadgetsRouter);
app.use('/', GamingRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
connectToMongoDB("mongodb+srv://priteshgupta032:Wr3JMPxIxU3h6yOV@creative-technology.40p6wzw.mongodb.net/Creative-Technology").then(() =>
  console.log("connected")
  );// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
module.exports = app;
