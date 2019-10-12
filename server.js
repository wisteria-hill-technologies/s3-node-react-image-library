const express = require('express'); //Parse response + routing
const path = require('path');
const http = require('http'); //http module from node.js
const bodyParser = require('body-parser'); //Help parse incoming HTTP requests
const morgan = require('morgan'); //for logging
const expressValidator = require('express-validator'); //validator middleware for user inputs
// const cors = require('cors'); // require cors
const upload = require('./services/file-upload');
const singleUpload = upload.single('uploadFile');
const getS3ImageList = require('./services/get-S3-image-list');
const s3 = require('./services/s3Instance');

const app = express();

// *** App Setup middlewares *** - morgan, cors, bodyParser are middlewares.
app.use(morgan('combined')); //morgan logs incoming requests, used for debugging. It shows you how requests are made,etc.

app.post('/api/upload', (req, res) => {
  // console.log('req.file>>', req.file);
  singleUpload(req, res, function (err) {
    if (err) {
      res.status(400).send({ errors: [err.message] });
    } else {
      res.json({ "imageUrl": req.file && req.file.location });
    }
  });
});

app.use(bodyParser.json({ type: '*/*' })); //parse incoming requests to json object (as req.body), to make it easy to handle.

app.use(expressValidator()); // This line has to be just after app.use(bodyParser...).
app.use(express.static(path.join(__dirname, '../build-server')));

app.get('/api/hello', (req, res) => {
  res.send({ greeting: "Hello!" });
});

app.get('/api/images', async (req, res) => {
 const response = await getS3ImageList();
  res.send({ response });
});

app.post('/api/images/delete', async (req, res) => {
  const { key } = req.body || {};
  console.log('key>>', key);
  const params = {
    Bucket: 'test-bucket-image-storage',
    Key: key
  };
  s3.deleteObject(params, function(err, data) {
    if (err) {
      res.status(500).send({ success: false, errors: [err.message] });
      // res.status(400).send({ errors: [err.message] });
    } else {
      res.send({ success: true });
    }
  });


});

const port = process.env.SERVER_PORT || 8080;
const server = http.createServer(app);
server.listen(port, () => console.log(`Proxy server listening on port ${port}!`));
