var express = require('express');
var router = express.Router();
var Customer     = require('../models/customer');
var Mailer     = require('../components/mailer');



router.route('/customers')

    .post(function(req, res, next) {

      var customer = new Customer();
      customer.email = req.body.email;
      customer.telephone = req.body.telephone;
      customer.winner = req.body.winner;

      // save the bear and check for errors
      customer.save(function(err,result) {
        if (err){
          res.send(err);
        }else{
          Mailer.sendy(req.body.email);
          res.json({ message: 'Customer created!', lastId : result._id});
        }
      });

    })

      .get(function(req, res, next) {

        Customer.find(function(err, customers) {
          if (err)
            res.send(err);

          res.type('application/json');
          res.send(JSON.stringify(customers, null, 1)); //\t or \n
        });

});

addCustomer = function(newCust){
  var customer = new Customer();

  customer.email = newCust.email;
  customer.telephone = newCust.telephone;

  // save the bear and check for errors
  customer.save(function(err,result) {
    if (err){
      console.log(err);
    }else{
      //Mailer.sendy(newCust.email);
      console.log( 'Customer created! id: '+result._id);
    }
  });
},


module.exports = { router : router, addCustomer : addCustomer }