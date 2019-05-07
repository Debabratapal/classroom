const AWS = require('aws-sdk');

let sns = new AWS.SNS({
  apiVersion: '2010-03-31',
  credentials: {
    accessKeyId: 'AKIATN7X37IPJCBA4POA',
    secretAccessKey: '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'
  },
  region: 'us-west-2'
});
//9DD5Ta7ipcCUZVKc+qzfmCtG9MlRAUhe4psCYd2v
//AKIATN7X37IPJCBA4POA
const messenger = (req, callback) => {
  console.log(req);
  
  let promise = req.mobile.map(obj => {
    let params = {
      Message: req.message,
      PhoneNumber: obj,
    };
    console.log(params);
    
    return new Promise((resolve, reject) => {
      let p = sns.setSMSAttributes({
        attributes: {
          DefaultSenderID: 'NotifyMe',
          DefaultSMSType: 'Promotional'
        }
      }).promise();
      p.then(data => {
        let send =sns.publish(params).promise();
        send.then(data => {
          resolve(data)
        })  
        .catch(err => {
          resolve(err);
        })
      })
      
    })
   
  })

  Promise.all(promise).then(data => {
    // console.log((data));
    console.log(data);
    
  })
}

module.exports = messenger;