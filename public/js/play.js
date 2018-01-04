/**
 * Created by SaddeM on 30/12/2017.
 */
$(function () {

    // Create a new ClientJS object
    var client = new ClientJS();

// Get the client's fingerprint id
    var fingerprint = client.getFingerprint();




    gessais = null;

    uniqDevice = fingerprint;
    rand = $('#rand').data('rand');

    function isValidEmailAddress(emailAddress) {
        var pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(emailAddress);
    }



    var socket = io();

    socket.emit("firstTime",rand);


    socket.emit("checkDevice",uniqDevice);




    socket.on('checkFirst', function(roomFirstObj){

        if(roomFirstObj.activation!=1){
            openModal();
        }else{
            roomObj = {room : rand, customer : null };
            socket.emit("joinRoom",roomObj);
            $("#essais").text(roomFirstObj.essais);
        }

    });



    function openModal(){
    $("#subscribes").modal(
        {
            backdrop: 'static',
            keyboard: false
        }
    );
    }


    $( "input[type='email']" ).bind('keyup change', function() {
        if (isValidEmailAddress(this.value)) {
            $("#starty").removeAttr("disabled");
        }else{
            $("#starty").attr("disabled", "disabled");
        }
    });




    socket.on('playPressed', function(essais){
        gessais = essais;
        $("#essais").text(gessais);


    });




    socket.on('Result', function(what){

        what ? winner() : looser();

    });

    socket.on("error",function(err){
        console.log('there is an error');
        if(err==1){
            //$('body').text('Cette partie n"existe pas');
            window.location = "/notfound";
        }else if(err==2){
            //$('body').text('Partie déjà en cours');
            window.location = "/already";
        }


    });

    $("#starty").on('click', function(){

        $("#fullView").show();

        var firstname = $("#inputFirstname").val();
        var lastname = $("#inputLastname").val();
        var company = $("#inputCompany").val();
        var email = $("#inputEmail").val();
        var telephone = $("#inputTel").val();



        customer = {firstname : firstname, lastname : lastname, company: company, email : email, telephone : telephone, uniq : uniqDevice};
        roomObj = {room : rand, customer : customer };


        socket.emit("joinRoom",roomObj);


    });


    window.addEventListener("deviceorientation", function(event) {
        if (Math.round(event.beta)<0 && !$('#app-play').is(":disabled")){

            var that = $('#app-play');
            startSchuffle(that);

        }

    }, true);


    $('#app-play').click(function(){

        startSchuffle(this);

    });

    function startSchuffle(thats){

        navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;
        if (navigator.vibrate){
        navigator.vibrate(1000);
        }


        socket.emit('playPressed',rand);


        var oldValue = $(thats).text();
        $(thats).attr("disabled", "disabled");
        $(thats).text("Wait...");


        setTimeout(function(){

            document.getElementById('app-play').innerHTML = oldValue;
            document.getElementById('app-play').removeAttribute('disabled');
            if (gessais==1){
                $("#lastEssais").text("This is your last chance !");
            }


        }, 5000)

    }
    function looser(){
        window.location = "/loose";
    }

    function winner(){
        window.location = "/win";
    }

    //for mobile error hundle
    /*window.onerror = function(error) {
        alert(error);
    };*/



});