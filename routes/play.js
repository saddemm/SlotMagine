var express = require('express');
var router = express.Router();


/* GET users listing. */
router.get('/:rand', function(req, res, next) {

  var rand = req.params.rand;
  var ip = req.headers['x-forwarded-for'] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress;


  var cutIp = ip.substring(0, 13);

  if (cutIp == '::ffff:66.249'){
    console.log('XXXX  Its google XXXXXXX');
  }else{
    console.log('XXXXXXXXX c bon XXXXXXXXXx');
  }


  res.render('play', {rand : rand});
});

module.exports = router;
