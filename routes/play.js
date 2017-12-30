var express = require('express');
var router = express.Router();


/* GET users listing. */
router.get('/:rand', function(req, res, next) {

  res.render('play', {rand : req.params.rand});
});

module.exports = router;
