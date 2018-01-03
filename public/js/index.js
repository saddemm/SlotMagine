/**
 * Created by SaddeM on 30/12/2017.
 */

$(document).ready(function() {

     rootUrl = window.location.href+"play/";
     rand = $('#rand').data('rand');
     link2 = rootUrl+rand;
    if (rootUrl != 'http://localhost:3000/play/' && rootUrl != 'http://192.168.1.60:3000/play/'){
        rootUrl = 'http://144.217.5.57:3000/play/';
        link2 = rootUrl+rand;


    // getting the shortener url from google
    $.ajax({
        url: 'https://www.googleapis.com/urlshortener/v1/url?shortUrl=http://goo.gl/fbsS&key=AIzaSyDAoD3F7pUxYDUr1d4_gIDEkoxdst8Qbps',
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        data: '{ longUrl: "' + link2 +'"}',
        dataType: 'json',
        success: function(response) {
            shortenerUrl = response.id; // Evaluate the J-Son response object.

            $('#qr-code').qrcode(shortenerUrl);


            $('#qr-link-2').html("<a>"+shortenerUrl+"</a>");

        }
    });

    }else{
        $('#qr-code').qrcode(link2);
         $('#qr-link-2').html("<a>"+link2+"</a>");
    }

});

$(document).ready(function(){

    var settings = {
        countdown : 60 // seconds
    };

    var $text_countdown  = $("span#timer-count");


    var timerCountDown = function () {
        var countdownNumberEl = document.getElementById('countdown-number');
        var countdown = settings.countdown;

        countdownNumberEl.textContent = countdown;

        var intId = setInterval(function() {

            if (countdown < 2){
                clearInterval(intId);
                // call function to handle timeout :: loose
                reloader();
            }

            countdown = --countdown <= 0 ? settings.countdown : countdown;

            var countdownT = countdown < 10 ? "0"+countdown : countdown;
            countdownNumberEl.textContent = countdownT;
            $text_countdown.text(countdownT);


        }, 1000);
    };




    initBackgroundAnimation = function(){

        var colors = [
            [244, 107, 69],
            [238, 168, 73],
            [192, 36, 37],
            [240, 203, 53],
            [237, 143, 3],
            [248, 181, 0]
        ];

        var step = 0;
        //color table indices for:
        // current color left
        // next color left
        // current color right
        // next color right
        var colorIndices = [0,1,2,3];

        //transition speed
        var gradientSpeed = 0.002;

        function updateGradient()  {

            if ( $===undefined ) return;

            var c0_0 = colors[colorIndices[0]];
            var c0_1 = colors[colorIndices[1]];
            var c1_0 = colors[colorIndices[2]];
            var c1_1 = colors[colorIndices[3]];

            var istep = 1 - step;
            var r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
            var g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
            var b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
            var color1 = "rgb("+r1+","+g1+","+b1+")";

            var r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
            var g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
            var b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
            var color2 = "rgb("+r2+","+g2+","+b2+")";

            $('body').css({
                background: "-webkit-gradient(linear, left top, right top, from("+color1+"), to("+color2+"))"}).css({
                background: "-moz-linear-gradient(left, "+color1+" 0%, "+color2+" 100%)"});

            step += gradientSpeed;
            if ( step >= 1 )  {
                step %= 1;
                colorIndices[0] = colorIndices[1];
                colorIndices[2] = colorIndices[3];

                //pick two new target color indices
                //do not pick the same as the current one
                colorIndices[1] = ( colorIndices[1] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
                colorIndices[3] = ( colorIndices[3] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;

            }
        }


        setInterval(updateGradient,20);

    };


    initBackgroundAnimation();





    var socket = io();

    var reloader = function reloader(){
        socket.emit('loose', rand);
        window.location.reload();
    }



    socket.on('Result', function(what){

        what ? window.location.reload():null;

    });



    socket.on('playPressed', function(essais){

        //use gessais to global to hundle the lose
        gessais = essais;

        $("#essais").text(gessais);


        startSchufle();


    });


    socket.emit('createRoom',rand);




    socket.on('joinRoom', function(){

        $mainPage = $("section.main-page");
        $gamePage = $("section.game-page");

        $mainPage.addClass("hide");
        $gamePage.removeClass("hide");

        timerCountDown();


        initMachines();


    });

    function initMachines(){
        machine1 = $("#machine1").slotMachine({
            active	: 0,
            delay	: 600
        });

        machine2 = $("#machine2").slotMachine({
            active	: 1,
            delay	: 700,
            direction: 'down'
        });

        machine3 = $("#machine3").slotMachine({
            active	: 2,
            delay	: 800
        });
    }

    function onComplete(){


        switch(this.element[0].id){
            case 'machine1':
                active1 = this.active;
                break;
            case 'machine2':
                active2 = this.active;
                break;
            case 'machine3':
                active3 = this.active;
                break;
            case true:

        }

        if (this.element[0].id=='machine3'){
            if (gessais==1){
                $("#lastEssais").text("This is your last chance");
            }
            checks(active1, active2, active3);
        }




        if (gessais<=0){
            setTimeout(function(){

                reloader();

            },1500);
        }
    }


    function startSchufle(){


        machine1.shuffle(5, onComplete);


        machine2.shuffle(5, onComplete);

        machine3.shuffle(5, onComplete);



    }

    function checks(active1, active2, active3) {
        console.log(active1 + " " + active2 + " " + active3);

        packetChecker = {active1: active1, active2: active2, active3: active3, room: rand}

        socket.emit('checks', packetChecker);

    }




});
