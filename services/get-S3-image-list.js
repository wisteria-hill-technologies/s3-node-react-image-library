const s3 = require('./s3Instance');

const getS3ImageList = () => {
  return s3.listObjectsV2({
    Bucket: 'test-bucket-image-storage',
    Prefix: 'folder1'
  }).promise();
};

module.exports = getS3ImageList;
