var express = require('express');
var router = express.Router();
var userModel = require("./users");

//passport and passport-local import hua 
var passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

//passport ko locally bnaya and usmein mongodb ka database add hua ->
passport.use(new LocalStrategy(userModel.authenticate()));

//isLoggedIn jha bhi aaya hai woh page without login kiye nhi khulega ye middleware hai ->
//isse hi authentication kehte hai 
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

//  REGISTER karne ka route yha se user ka likha data fetch hua ->
router.post('/register', function(req, res) {
  var newUser = new userModel({
    username: req.body.username,
    email: req.body.email
  });

  // password secure hogya and next page chala jayega user 
  //  if pass not matches wapas home aajayega

  userModel.register(newUser, req.body.password)
    .then(function(user) {
      passport.authenticate("local")(req, res, function() {
        res.redirect('/home');
      });
    })
    .catch(function(err) {
      console.log(err);
      res.redirect('/');
    });
});

//middleware hai ye use it everytime before next page->
function isloggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/");
}

// first page se next tabhi jaa sakte hai agar authentication sahi se hua warna wapas 
router.post("/login",
  passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/"
  })
);

// LOGOUT page
router.get('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) return next(err);
    res.redirect('/');
  });
});

module.exports = router;
