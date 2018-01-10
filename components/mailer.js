var nodemailer = require('nodemailer');
function mailTag(winner){
    if (winner){
        mess = "Thank you for participating to our Digital Raffle, the luck was on your side and you have won a nice Acrelec Bluetooth Speaker." +
            " To pick it up, please show this e-mail confirmation to an Acrelec Sales Representative who will give you your reward.";
    }else{
        mess = "Thank you for participating to our Digital Raffle but unfortunately lady luck didn't strike today."+
            "Don't worry, you will be able to retry your luck tomorrow on our booth !";
    }
return "" +
    "<div class='example-emails margin-bottom-50'>\
<div width='100%' style='background: #eceff4; padding: 50px 20px; color: #514d6a;'>\
    <div style='max-width: 700px; margin: 0px auto; font-size: 14px'>\
    <table border='0' cellpadding='0' cellspacing='0' style='width: 100%; margin-bottom: 20px'>\
    <tr>\
    <td style='vertical-align: top;'>\
    <img src='http://www.acrelec.com/wp-content/themes/acrelec/assets/img/logo.png' alt='Acrelec logo' style='height: 40px' />\
    </td>\
    <td style='text-align: right; vertical-align: middle;'>\
    <span style='color: #a09bb9;'>\
    Acrelec/NRF 2018\
</span>\
</td>\
</tr>\
</table>\
<div style='padding: 40px 40px 20px 40px; background: #fff;'>\
    <table border='0' cellpadding='0' cellspacing='0' style='width: 100%;'>\
    <tbody><tr>\
    <td>\
    <p>Dear guest,</p>\
<p>Thanks for visiting our booth and discovered our phygital solutions during the NRF 2018.</p>\
<p>"+mess+"</p>\
<p>All the Acrelec team wish you a very happy and healthy new year.</p>\
<p>We are looking to work with you soon ☺</p>\
<!--[if mso]>\
  <v:roundrect xmlns:v='urn:schemas-microsoft-com:vml' xmlns:w='urn:schemas-microsoft-com:office:word' href='http://litmus.com' style='height:36px;v-text-anchor:middle;width:150px;' arcsize='5%' strokecolor='#EB7035' fillcolor='#EB7035'>\
    <w:anchorlock/>\
    <center style='color:#ffffff;font-family:Helvetica, Arial,sans-serif;font-size:16px;'>I am a button &rarr;</center>\
  </v:roundrect>\
<![endif]-->\
<center><a href='http://www.acrelec.com' style='display: inline-block; padding: 11px 30px; margin: 20px 0px 30px; font-size: 15px; color: #fff; background: #f37321; border-radius: 5px'>\
<img src='https://i.imgur.com/NMQIny8.jpg' />\
</a></center>\
<p>About Acrelec :</p>\
<p>A decision makes sense only if it serves our clients</p>\
<p>Innovate with our Technology </p>\
<p>Today's consumers demand convenience and speed of service from brands that can engage, educate and entertain them. </p>\
<p>The Acrelec Group is a leading digital transformation company that provides the world's largest restaurant, retail and leading brands with hardware, software and services to reimagine the customer experience for the digital age.  </p>\
<p>Our phygital solutions help brands engage consumers in new and innovative ways that add convenience, speed of service and engagement to the customer journey while increasing revenue and streamlining business processes.   </p>\
<p>Acrelec pioneered digital kiosks in quick service restaurants and gained prominence by developing digital commerce platforms for the world's largest retail brands.   </p>\
<p>Acrelec has over 20,000 installations in 50 countries and over 700 employees worldwide.   </p>\
<p>Enjoy the NRF 2018  </p>\
<p>Thanks   </p>\
<p>The Acrelec Team   </p>\
</td>\
</tr>\
</tbody>\
</table>\
</div>\
<div style='text-align: center; font-size: 12px; color: #a09bb9; margin-top: 20px'>\
    <p>\
    Acrelec Inc., 2 rue Louis Broglie, 77400 Saint-Thibault des Vignes, FRANCE\
<br />\
more informations : <a href='javascript: void(0);' style='color: #a09bb9; text-decoration: underline;'>info@acrelec.com</a>\
<br />\
Phone: +33 (0)1 72 03 24 10\
</p>\
</div>\
</div>\
</div>\
</div>";
}
module.exports = {
  sendy: function (emailParam,winner) {

			 // Not the movie transporter!
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'saddem.anane@gmail.com', // Your email id
            pass: 'Sadsad113' // Your password
        }
    });


	
	var mailHtml = mailTag(winner);
	var mailOptions = {
    from: '"Acrelec" <marketing@acrelec.com>', // sender address
	//req.body.email
    to: emailParam, // list of receivers
    subject: 'Acrelec/NRF 2018 : Thank you for participating!', // Subject line
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
			
			
			
			
			