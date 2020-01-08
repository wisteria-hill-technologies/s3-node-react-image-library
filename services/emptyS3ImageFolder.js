const s3 = require('./s3Instance');
const getS3ImageList = require('./get-S3-image-list');

const emptyS3ImageFolder = async (folderId) => {
  const listedObjects = await getS3ImageList(folderId);
  if (listedObjects.Contents.length === 0) return;

  const deleteParams = {
    Bucket: 'test-bucket-image-storage',
    Delete: { Objects: [] }
  };

  listedObjects.Contents.forEach(({ Key }) => {
    deleteParams.Delete.Objects.push({ Key });
  });

  await s3.deleteObjects(deleteParams).promise();

  if (listedObjects.IsTruncated) await emptyS3ImageFolder(folderId);
};

module.exports = emptyS3ImageFolder;
