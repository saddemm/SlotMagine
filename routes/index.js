var express = require('express');
var router = express.Router();


/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' , rand : rand = Math.random().toString(10).substring(7)});
});


module.exports = router;
