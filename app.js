var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/acrelec', { useMongoClient: true });

var passport = require('passport');
var flash    = require('connect-flash');
var session      = require('express-session');

//temporarly test
var Mailer     = require('./components/mailer');

var app = express();

var index = require('./routes/index');
var play = require('./routes/play');
var api = require('./routes/api');




var server = require('http').Server(app);
var io = require('socket.io')(server);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));
app.use('/node_modules',  express.static(__dirname + '/node_modules'));

// required for passport
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


app.use('/', index);
app.use('/play', play);
app.use('/api', api.router);
var admin = require('./routes/admin')(app, passport);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


//Mailer.sendy('walid.kocht@gmail.com', true);

io.on('connection', function(socket){

  console.log('a user connected');


  socket.on('disconnect', function(){
    console.log('user disconnected');
    console.log(io.sockets.adapter.rooms)
  });




  socket.on('createRoom', function (room) {
    console.log("Created: "+room);
    socket.join(room);

    //Au cas ou on veut laisser la game actif
    //io.sockets.adapter.rooms[room].activation=0;

    //Ses deux lignes ne sont pas obligatoire, c'est seulement pour gagner le temp du callback
    roomConfig = {essais : 3, winnerType : false};
    io.sockets.adapter.rooms[room].roomConfig = roomConfig;

    api.winnerNumber(function(err,result){
      var winnerType;

      if (result<5){
        winnerType = 'veryeasy';
        console.log("Mode very easy");
      }else if(result>4 && result<12){
        winnerType='easy';
        console.log("Mode easy");
      }else if(result>11 && result<21){
        winnerType='normal';
        console.log("Mode normal");
      }else if(result>20 && result<31){
        winnerType='hard';
        console.log("Mode hard");
      }else if (result>30){
        winnerType='impossible';
        console.log("Mode impossible");
      }

      roomConfig = {essais : 3, winnerType : winnerType};
      io.sockets.adapter.rooms[room].roomConfig = roomConfig;

      console.log("Number of winners today: "+result);
    });

    console.log(io.sockets.adapter.rooms[room]);
  });

  socket.on('checks', function (packetChecker) {


    if (packetChecker.active1 == packetChecker.active2 && packetChecker.active2 == packetChecker.active3 && packetChecker.active3 == packetChecker.active1){

      console.log('You Win');
      api.isWinner(true,io.sockets.adapter.rooms[packetChecker.room].customer);
      Mailer.sendy(io.sockets.adapter.rooms[packetChecker.room].customer.email, true);

      io.to(packetChecker.room).emit('Result',true);
      console.log(io.sockets.adapter.rooms[packetChecker.room].customer.email);
    }
  });

  socket.on('loose', function (room) {

    api.isWinner(false,io.sockets.adapter.rooms[room].customer);
    console.log('You Loose');
    Mailer.sendy(io.sockets.adapter.rooms[room].customer.email, false);
    io.to(room).emit('Result',false);
    console.log("XXXXXXXXXXXXXXXx ID xXXXXXXXXXXXXXXXXXX");
    console.log(io.sockets.adapter.rooms[room].customer._id);
    console.log("XXXXXXXXXXXXXXXXXXXXx ID xXXXXXXXXXXXXXXXXX");


  });

  socket.on('fullCheck', function (fullObj) {


    // on voit si la room existe avant
    if (io.sockets.adapter.rooms[fullObj.rand]) {
      if (io.sockets.adapter.rooms[fullObj.rand].length< 2 ) {

      api.canPlayToday(fullObj.uniqDevice, function (err, result) {


            console.log('Test on unique device processing ...');
          //on test sur l'unique device
          if (result) {

            io.to(socket.id).emit('startGame');
            console.log('startGame');

          } else {
            io.to(socket.id).emit('notToday');
            console.log('tu as déja joué aujourd hui bb')
          }

        });

      }else{
        //Already room
        console.log('Already room exist');
        io.to(socket.id).emit('error',2);
      }

    } else {

      //dosen't exist
      console.log('dosent exist');
      io.to(socket.id).emit('error', 1);
    }

  });
  
  socket.on('joinRoom', function (roomObj) {

    if (io.sockets.adapter.rooms[roomObj.room]){

      if (io.sockets.adapter.rooms[roomObj.room].length< 2 ) {

        socket.join(roomObj.room);
        io.to(roomObj.room).emit('joinRoom');

        api.addCustomer(roomObj.customer, function(err,result){
          io.sockets.adapter.rooms[roomObj.room].customer=result;
        });


      }else{
        io.to(socket.id).emit('error',2);
      }
    }else{
      console.log('dosent exist!');
      io.to(socket.id).emit('error',1);
    }


  });

  socket.on('playPressed', function(room){

    if (io.sockets.adapter.rooms[room].roomConfig.essais>0){
      
    console.log('playpressed Now !:');

      io.sockets.adapter.rooms[room].roomConfig.essais--;

    io.to(room).emit('playPressed',io.sockets.adapter.rooms[room].roomConfig);
      
    }


  });



});

module.exports = {app: app, server: server};
