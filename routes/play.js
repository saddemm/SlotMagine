var express = require('express');
var router = express.Router();


/* GET users listing. */
router.get('/:rand', function(req, res, next) {

  console.log('XXXX REFEEERERR XXXXX');
  var ip = req.headers['x-forwarded-for'] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress;

  console.log(ip);
  console.log('XXXX REFEEERERR XXXXX');

  res.render('play', {rand : req.params.rand});
});

module.exports = router;
