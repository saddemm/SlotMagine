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



io.on('connection', function(socket){

  console.log('a user connected');


  socket.on('disconnect', function(){
    console.log('user disconnected');
    console.log(io.sockets.adapter.rooms)
  });




  socket.on('createRoom', function (room) {
    console.log("Created: "+room);
    socket.join(room);

    io.sockets.adapter.rooms[room].activation=0;
    io.sockets.adapter.rooms[room].essais = 3;
    console.log(io.sockets.adapter.rooms[room]);
  });

  socket.on('checks', function (packetChecker) {

    if (packetChecker.active1 == packetChecker.active2 && packetChecker.active2 == packetChecker.active3 && packetChecker.active3 == packetChecker.active1){

      console.log('WIIIIIIIIIIIIIIN');

      io.to(packetChecker.room).emit('Result',true);
    }
  });

  socket.on('loose', function (room) {

    io.to(room).emit('Result',false);

  });

  //on voit si il a déja jouer aujourd'hui
  socket.on('checkDevice', function (uniqDevice) {

    api.canPlayToday(uniqDevice, function(err,result){

      //on test sur l'unique device
      if (!result) {

        io.to(socket.id).emit('Result',false);
        console.log('tu as déja joué mon chere')
      }

    });


  });

  socket.on('firstTime', function (rand) {

    // on voit si la room existe avant
    if (io.sockets.adapter.rooms[rand]) {

      io.to(socket.id).emit('checkFirst', io.sockets.adapter.rooms[rand]);
    }else{

    io.to(socket.id).emit('error',1);
    }

  });
  
  
  socket.on('joinRoom', function (roomObj) {

    if (io.sockets.adapter.rooms[roomObj.room]){

      if (io.sockets.adapter.rooms[roomObj.room].length< 2 ) {



        //il peux être null au cas ce n'est pas la premiere fois qu'il accéder a la room
        socket.join(roomObj.room);

        if (io.sockets.adapter.rooms[roomObj.room].activation!=1){
        api.addCustomer(roomObj.customer);
        io.to(roomObj.room).emit('joinRoom');
        }

        io.sockets.adapter.rooms[roomObj.room].activation=1;

      }else{
        io.to(socket.id).emit('error',2);
      }
    }else{
      console.log('dosent exist!');
      io.to(socket.id).emit('error',1);
    }


  });

  socket.on('playPressed', function(room){

    if (io.sockets.adapter.rooms[room].essais>0){
      
    console.log('playpressed Now !:');


      io.sockets.adapter.rooms[room].essais--;
      var essais = io.sockets.adapter.rooms[room].essais;

    io.to(room).emit('playPressed',essais);
      
    }


  });



});

module.exports = {app: app, server: server};
