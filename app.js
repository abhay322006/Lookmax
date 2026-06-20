var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressSession = require("express-session");
var passport = require("passport");

var indexRouter = require('./routes/index');

// IMPORTANT:
// yaha users.js tera USER MODEL hai, router nahi
var userModel = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// session
app.use(expressSession({
  resave: false,
  saveUninitialized: false,
  secret: "looks dekho"
}));

// passport
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(userModel.serializeUser());
passport.deserializeUser(userModel.deserializeUser());

app.use(logger('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// ROUTES
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;