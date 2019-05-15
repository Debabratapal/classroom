const AWS = require('aws-sdk');

let sns = new AWS.SNS({
  apiVersion: '2010-03-31',
  credentials: {
    accessKeyId: '',
    secretAccessKey: ''
  },
  region: 'us-east-1'
});

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
      .catch(err => {
        console.log(err);
        
      })
      
    })
   
  })

  Promise.all(promise).then(data => {
    console.log(JSON.stringify(data, undefined, 2));
    
  })
  .catch(err => {
    console.log(err)
    
  })
}

module.exports = messenger;
