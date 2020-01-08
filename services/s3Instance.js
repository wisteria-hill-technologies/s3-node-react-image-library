const aws = require('aws-sdk');

aws.config.update({
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  region: 'eu-west-2'
});
const s3 = new aws.S3({apiVersion: '2006-03-01'});

module.exports = s3;
