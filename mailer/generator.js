const Mailgen = require('mailgen');
const mailer = require("./mailer");

 
// REQUIREMENTS: Object: target = {name: String, email: String}
async function generator(target) {
    console.log("-=-=-=-=-",target.address);
  // Configure mailgen by setting a theme and your product info
  const mailGenerator = new Mailgen({
      theme: 'salted',
      product: {
          // Appears in header & footer of e-mails
          name: 'Food Ladder',
          link: 'https://foodladder.org/'
          // Optional product logo
          // logo: 'http://-------'
      }
  });


  const email = {
    body: {
        name: `${target.name}`,
        intro: `Welcome to Food Ladder! ${target.projectName} We\'re very excited to have you on board.`,
        action: {
            instructions: 'To get started with Food Ladder, please click the button below.',       
            button: {
                color: '#22BC66', // Optional action button color
                text: 'Confirm your account',
                link: `${target.address}/register/${target.code}`
            }
        },
        outro: `Button not working? Visit: ${target.address} and enter the code ${target.code}`
    }
  };

  // Generate an HTML email with the provided contents
  const emailBody = await mailGenerator.generate(email);

  console.log("mail file generated.");
  mailer(target, emailBody);
}

module.exports = generator;