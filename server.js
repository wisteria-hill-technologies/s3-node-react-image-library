const express = require('express'); //Parse response + routing
const multer = require('multer');
const path = require('path');
const http = require('http'); //http module from node.js
const bodyParser = require('body-parser'); //Help parse incoming HTTP requests
const morgan = require('morgan'); //for logging
const expressValidator = require('express-validator'); //validator middleware for user inputs
// const cors = require('cors'); // require cors

const app = express();

// *** App Setup middlewares *** - morgan, cors, bodyParser are middlewares.
app.use(morgan('combined')); //morgan logs incoming requests, used for debugging. It shows you how requests are made,etc.

const storage = multer.diskStorage({
  destination: "./uploads/",  //location to save files
  filename: function(req, file, cb){
    cb(null,"IMAGE-" + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits:{fileSize: 1000000},
}).single("uploadFile");

app.post('/api/upload', upload, (req, res) => {
  console.log('req.file>>', req.file);
  console.log('req.body>>', req.body);
  res.send({success: true });
});


app.use(bodyParser.json({ type: '*/*' })); //parse incoming requests to json object (as req.body), to make it easy to handle.

app.use(expressValidator()); // This line has to be just after app.use(bodyParser...).
app.use(express.static(path.join(__dirname, '../build-server')));

app.get('/api/hello', (req, res) => {
  res.send({ greeting: "Hello!" });
});

const port = process.env.SERVER_PORT || 8080;
const server = http.createServer(app);
server.listen(port, () => console.log(`Proxy server listening on port ${port}!`));
