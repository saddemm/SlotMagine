var express = require('express');
var router = express.Router();


/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' , rand : rand = Math.random().toString(10).substring(7)});
});

router.get('/win', function(req, res, next) {
  res.render('win');
});

router.get('/loose', function(req, res, next) {
  res.render('loose');
});

router.get('/404', function(req, res, next) {
  res.render('404');
});

router.get('/notfound', function(req, res, next) {
  res.render('notfound');
});

router.get('/already', function(req, res, next) {
  res.render('already');
});

router.get('/tomorrow', function(req, res, next) {
  res.render('tomorrow');
});


module.exports = router;
