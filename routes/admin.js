var express = require('express');
var router = express.Router();
var Customer     = require('../models/customer');


/* GET users listing. */
router.get('/', function(req, res, next) {

  Customer.find({}).sort('-created_at').exec(function(err, customers) {
    if (err)
      res.send(err);

    res.render('customers', {customers : customers});
  });

});

module.exports = router;
