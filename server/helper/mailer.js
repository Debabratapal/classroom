const nodemailer = require('nodemailer');
const sgTransport = require('nodemailer-sendgrid-transport');

const options = {
  auth: {
    api_key: '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'
  }
}

var client = nodemailer.createTransport(sgTransport(options));


var email = {
  from: 'paldebabrata82@gmail.com',
  to: 'mr.walrus@foo.com',
  text: 'Hello world',
  html: '<b>Hello world</b>'
};

const sendEmail = (body) => {

  let email = {
    from: 'monish.das57@gmail.com',
    to: body.to,
    subject: 'You Have a Meeting',
    text: 'Hello world',
    html: '<b>Hello world</b>'
  }
  client.sendMail(email, function (err, info) {
    if (err) {
      console.log(err);
      
    }
    else {
      console.log('Message sent: ' + info.response);
    }
  });
}

module.exports = sendEmail;