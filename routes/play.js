var express = require('express');
var router = express.Router();


/* GET users listing. */
router.get('/:code', function(req, res, next) {
  code = req.params.code;


  res.render('play', {code : code});
});

module.exports = router;
