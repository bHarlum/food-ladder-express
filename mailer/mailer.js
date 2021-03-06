const nodemailer = require('nodemailer');
require('dotenv').config();

// REQUIREMENTS: Object: target = {name: String, email: String}
function mailer(target, email){
  console.log(target);
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_ADDRESS,
      pass: process.env.MAIL_PASSWORD
    }
  });

  const mailOptions = {
    from: process.env.MAIL_ADDRESS,
    to: target.email,
    subject: 'Invitation to join Food Ladder online support.',
    html: email
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log("Error sending mailer");
      console.log(error.message);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

module.exports = mailer;