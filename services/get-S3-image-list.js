const s3 = require('./s3Instance');

const getS3ImageList = (folderId) => {
  return s3.listObjectsV2({
    Bucket: 'test-bucket-image-storage',
    Prefix: `${folderId}/`
  }).promise();
};

module.exports = getS3ImageList;
