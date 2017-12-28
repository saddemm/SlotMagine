var nodemailer = require('nodemailer');
function mailTag(){
return "<h1> HTML Test send mail </h1>";
}
module.exports = {
  sendy: function (emailParam) {

			 // Not the movie transporter!
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'saddem.anane@gmail.com', // Your email id
            pass: 'sadsad113' // Your password
        }
    });


	
	var mailHtml = mailTag();
	var mailOptions = {
    from: '<game@acrelec.com>', // sender address
	//req.body.email
    to: emailParam, // list of receivers
    subject: 'Acrelec - Vous venez de jouer', // Subject line
    html: mailHtml //, // plaintext body
    // html: '<b>Hello world ?</b>' // You can choose to send an HTML body instead
};
transporter.sendMail(mailOptions, function(error, info){
    if(error){
        console.log(error);
        //res.json({yo: 'error'});
    }else{
        console.log('Message sent: ' + info.response);
        //res.json({yo: info.response});
    };
});

  }
  
};
			
			
			
			
			