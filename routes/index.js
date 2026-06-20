var express = require('express');
var router = express.Router();
var userModel = require("./users");

var passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

passport.use(new LocalStrategy(userModel.authenticate()));

// LOGIN PAGE
router.get('/', function(req, res) {
  res.render('login');
});

// HOME PAGE
router.get('/home', isloggedIn, function(req, res) {
  res.render('index');
});

// OTHER PAGES
router.get('/scan', isloggedIn, function(req, res) {
  res.render('scan');
});

router.get('/result', isloggedIn, function(req, res) {
  res.render('shownresult');
});

router.get('/week', isloggedIn, function(req, res) {
  res.render('week');
});

// REGISTER
router.post('/register', function(req, res) {
  var newUser = new userModel({
    username: req.body.username,
    email: req.body.email
  });

  userModel.register(newUser, req.body.password)
    .then(function(user) {
      passport.authenticate("local")(req, res, function() {
        res.redirect('/home');
      });
    })
    .catch(function(err) {
      console.log("REGISTER ERROR:", err);
      res.redirect('/');
    });
});

// LOGIN
router.post('/login', function(req, res, next) {
  passport.authenticate("local", function(err, user, info) {
    if (err) {
      console.log("LOGIN ERROR:", err);
      return next(err);
    }

    if (!user) {
      console.log("LOGIN FAILED");
      return res.redirect('/');
    }

    req.logIn(user, function(err) {
      if (err) {
        console.log("REQ.LOGIN ERROR:", err);
        return next(err);
      }

      console.log("LOGIN SUCCESS:", user.username);
      return res.redirect('/home');
    });
  })(req, res, next);
});

// LOGOUT
router.get('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) return next(err);
    res.redirect('/');
  });
});

// MIDDLEWARE
function isloggedIn(req, res, next) {
  console.log("AUTH CHECK:", req.isAuthenticated());
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}

module.exports = router;