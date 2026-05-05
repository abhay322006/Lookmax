var express = require('express');
var router = express.Router();
var userModel = require("./users");
var passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

passport.use(new LocalStrategy(userModel.authenticate()));

router.get('/', function(req, res) {
  res.render('login');
});

router.get('/home', isloggedIn, function(req, res) {
  res.render('index');
});

router.get('/scan', isloggedIn, function(req, res, next) {
  res.render('scan', { title: 'Express' });
});
router.get('/result', isloggedIn, function(req, res, next) {
  res.render('shownresult', { title: 'Express' });
});
router.get('/week', isloggedIn, function(req, res, next) {
  res.render('week', { title: 'Express' });
});

// ✅ REGISTER
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
    });
});


function isloggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/");
}

// ✅ LOGIN
router.post("/login",
  passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/"
  })
);

// ✅ LOGOUT
router.get('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) return next(err);
    res.redirect('/');
  });
});

module.exports = router;
