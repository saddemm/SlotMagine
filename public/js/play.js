/**
 * Created by SaddeM on 30/12/2017.
 */
$(function () {

    rand = $('#rand').data('rand');

    function isValidEmailAddress(emailAddress) {
        var pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(emailAddress);
    }



    var socket = io();

    socket.emit("firstTime",rand);


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
        $("#essais").text(essais);

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

        var email = $("#inputEmail").val();
        var telephone = $("#inputTel").val();

        console.log(email);
        customer = {email : email, telephone : telephone};
        roomObj = {room : rand, customer : customer };


        socket.emit("joinRoom",roomObj);


    });


    window.addEventListener("deviceorientation", function(event) {
        if (Math.round(event.beta)<0 && !$('#app-play').is(":disabled")){
            $('#app-play').click();

        }

    }, true);


    $('#app-play').click(function(){

        navigator.vibrate(5000);


        socket.emit('playPressed',rand);


        var oldValue = $(this).text();
        $(this).attr("disabled", "disabled");
        $(this).text("Patientez...");


        setTimeout(function(){

            document.getElementById('app-play').innerHTML = oldValue;
            document.getElementById('app-play').removeAttribute('disabled');


        }, 5000)

    });


    function looser(){
        window.location = "/loose";
    }

    function winner(){
        window.location = "/win";
    }



});