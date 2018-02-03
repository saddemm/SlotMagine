var nodemailer = require('nodemailer');
function mailTag(winner){
    if (winner){
        mess = "Thank you for participating in Acrelec's Digital Raffle, Congratulations, you have been selected as one of today's winners.. " +
            "To claim this prize, please present this email confirmation to an Acrelec Sales Representative in booth #2435. ";
    }else{
        mess = "Thank you for participating in Acrelec's Digital Raffle, we are sorry that you were not selected as one of today's winners."+
            "Please visit the Acrelec booth, #2435, tomorrow for another chance to win a custom giveaway !";
    }
return "" +
    "<div>\
<div width='100%' style='background: #eceff4; padding: 20px; color: #514d6a;'>\
    <div style='width: 100% ; margin: 0px auto; font-size: 14px'>\
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
    <div style='padding: 20px; background: #fff; width:80px%' margin:0 auto;>\
<table border='0' cellpadding='0' cellspacing='0' style='width: 100%;'>\
        <tbody><tr>\
        <td>\
        <p>Hello Future Partner</p>\
    <p>Thanks for visiting our booth and discovered our phygital solutions during the NRF 2018.</p>\
    <p>"+mess+"</p>\
    <p>We are looking forward to seeing and working with you soon ☺</p>\
    <!--[if mso]>\
<v:roundrect xmlns:v='urn:schemas-microsoft-com:vml' xmlns:w='urn:schemas-microsoft-com:office:word' href='http://litmus.com' style='height:36px;v-text-anchor:middle;width:150px;' arcsize='5%' strokecolor='#EB7035' fillcolor='#EB7035'>\
        <w:anchorlock/>\
    <center style='color:#ffffff;font-family:Helvetica, Arial,sans-serif;font-size:16px;'>I am a button &rarr;</center>\
    </v:roundrect>\
    <![endif]-->\
    <center><a href='http://www.acrelec.com' style='display: inline-block;padding: 5px;margin: 10px 0;font-size: 15px;color: #fff;background: #f37321;border-radius: 5px;max-width: 50%;'>\
        <img src='https://i.imgur.com/QeqSXk8.jpg' style='max-width:100%'/>\
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
    <p>The Acrelec Team   </p>\
    </td>\
    </tr>\
    </tbody>\
    </table>\
    </div>\
    <div style='text-align: center; font-size: 12px; color: #a09bb9; margin-top: 20px'>\
        <p>\
        Acrelec America., 5490 Campbells Run Road, Pittsburgh, PA 15205,\
    <br />\
    877.334.9737\
    <br />\
    www.acrelec.com\
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
        host: 'exchange.acrelec.com',
        port: 587,
        secure:false,
        auth: {
            user: 'digital.raffle',
            pass: 'Acre_2018!'
        }
    });



	
	var mailHtml = mailTag(winner);
	var mailOptions = {
    from: '"Acrelec" <digital.raffle@acrelec.com>', // sender address
	//req.body.email
    to: emailParam, // list of receivers
    subject: 'Acrelec/NRF 2018 : Congratulations from Acrelec!!', // Subject line
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
			
			
			
			
			