var express = require('express');
var router = express.Router();


/* GET users listing. */
router.get('/:rand', function(req, res, next) {

  console.log('XXXX REFEEERERR XXXXX');
  var ip = request.headers['x-forwarded-for'] ||
      request.connection.remoteAddress ||
      request.socket.remoteAddress ||
      request.connection.socket.remoteAddress;
  
  console.log(ip);
  console.log('XXXX REFEEERERR XXXXX');

  res.render('play', {rand : req.params.rand});
});

module.exports = router;
