
var Customer     = require('../models/customer');
var LocalStrategy   = require('passport-local').Strategy;


module.exports = function(app,passport) {

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(user, done) {

            done(null, user);

    });

    passport.use(new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback : true
        },
        function(req, username, password, done) {


                if (username!='admin@admin.com') {
                    return done(null, false, req.flash('loginMessage', 'Incorrect login'));
                }
                if (password!='admin') {
                    return done(null, false, req.flash('loginMessage', 'Incorrect password'));
                }

                var user = {username:username,password:password,id:'000001'};
                return done(null, user);

        }
    ));


    app.get('/admin/login', function (req, res, next) {

        res.render('login', { message: req.flash('loginMessage') });


    });

    app.post('/admin',
        passport.authenticate('local', { successRedirect: '/admin',
        failureRedirect: '/admin/login',
        failureFlash: true }));

    /* GET users listing. */
    app.get('/admin', /*isLoggedIn,*/ function (req, res, next) {

        Customer.find({}).sort('-created_at').exec(function (err, customers) {
            if (err)
                res.send(err);

            res.render('customers', {customers: customers});
        });

    });

    // route middleware to make sure a user is logged in
    function isLoggedIn(req, res, next) {

        // if user is authenticated in the session, carry on 
        if (req.isAuthenticated())
            return next();

        // if they aren't redirect them to the home page
        res.redirect('/admin/login');
    }

}
