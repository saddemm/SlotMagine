var express = require('express');
var router = express.Router();
var Customer     = require('../models/customer');
var Mailer     = require('../components/mailer');
var moment = require('moment');
var todayFormat = moment().format('YYYY-DD-MM');


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
          //Mailer.sendy(req.body.email);
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

router.route('/testy')
    .get(function(req, res, next) {

        Customer.find({"tester_date": {"$eq": todayFormat}, "uniq" : {"$eq" : "848253505"}}, function(err, customers) {
            if (err)
                res.send(err);

            res.type('application/json');
            res.send(JSON.stringify(customers, null, 1)); //\t or \n
        });

    });
addCustomer = function(newCust){
  var customer = new Customer();

  customer.firstname = newCust.firstname;
  customer.lastname = newCust.lastname;
  customer.company = newCust.company;
  customer.email = newCust.email;
  customer.telephone = newCust.telephone;
  customer.uniq = newCust.uniq;
    //only for test
  customer.tester_date = todayFormat;

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

    canPlayToday = function(uniq, callback){



         Customer.find({"tester_date": {"$eq": todayFormat}, "uniq" : {"$eq" : uniq}}, function(err, customers) {

             var canplay = true;
             
            if (err){
                console.log(err);
            }

            if (customers.length > 0){
                canplay =  false;
            }

             callback(null,canplay);

        });


    }


module.exports = { router : router, addCustomer : addCustomer , canPlayToday : canPlayToday}