const express = require('express');
const bodyParser = require("body-parser");
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

var whitelist = ['https://vinfastgiatot5s.com'];
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}

app.use(cors(corsOptionsDelegate));

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());
app.use(bodyParser.text());

app.get('/', function(req, res) {
  res.send('Hello world!');
});

app.post('/alm', function(req, res) {
  res.setHeader('Access-Control-Allow-Origin', 'https://vinfastgiatot5s.com');
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Origin, Cache-Control, X-Requested-With');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  let params = req.body;
  res.send(params);
});

app.listen(port, function() {
  console.log(`Example app listening at http://localhost:${port}`);
});