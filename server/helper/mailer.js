const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('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');

const sendMail = msg => {
console.log('hiiiiiiiiii');
let meta = {
  params: {
    from : {email:'paldebabrata82@gmail.com', name: 'Monish'},
    subject: 'Sending with SendGrid is Fun',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    text: 'and easy to do anywhere, even with Node.js',
  }

}
//AKIATN7X37IPH3HJC2UR
///MbZXNLh2/3AHTDsnbBvj1W1pnZLWuJu/JA+k85zY

sendEmail(meta, cb)

} 

const sendEmail = (meta, cb) => {
  sgMail.send(meta)
}


module.exports = sendMail;