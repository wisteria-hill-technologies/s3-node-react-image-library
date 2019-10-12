const s3 = require('./s3Instance');
const multer = require('multer');
const multerS3 = require('multer-s3');

//// To save the file to local file system.
// const storage = multer.diskStorage({
//   destination: "./uploads/",  //location to save files
//   filename: function(req, file, cb){
//     cb(null,"IMAGE-" + Date.now() + path.extname(file.originalname));
//   }
// });

const storage = multerS3({
  s3: s3,
  bucket: 'test-bucket-image-storage',
  acl: 'public-read',
  metadata: function (req, file, cb) {
    cb(null, {fieldName: file && file.fieldname});  //file.fieldname will be the name of input field from the FE.
  },
  key: function (req, file, cb) {
    cb(null, "folder1/IMAGE-"+Date.now().toString()+(file.originalname))  // pass a file name here for the newly created file.
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    console.log('correct mimeType!');
    cb(null, true);
  } else {
    console.log('invalid mimeType!');
    cb(new Error('Invalid File Type'), false);
  }
};

const upload = multer({
  fileFilter: fileFilter,
  storage: storage,
  limits:{fileSize: 1000000},
});

module.exports = upload;
