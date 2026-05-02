var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/scan', function(req, res, next) {
  res.render('scan', { title: 'Express' });
});
router.get('/result', function(req, res, next) {
  res.render('shownresult', { title: 'Express' });
});
router.get('/week', function(req, res, next) {
  res.render('week', { title: 'Express' });
});

module.exports = router;
