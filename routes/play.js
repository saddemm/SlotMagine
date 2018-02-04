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

    console.log("XXXXXX ip XXXXXXXXXXXX");
    console.log(cutIp);
    console.log("XXXXXX ip XXXXXXXXXXXX");

  //On deny la requete de google pour le test shortcode
  if (cutIp == '::ffff:66.249' || cutIp== 'fff:72.14.'){
    rand = 'randomNoExist';
  }


  res.render('play', {rand : rand});
});

module.exports = router;
