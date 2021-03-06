const express = require('express');
const bodyParser = require("body-parser");
const cors = require('cors');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 5000;

var whitelist = ['https://vinfastgiatot6s.com'];
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

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'https://vinfastgiatot6s.com');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'POST');
  res.header('Content-Type', 'text/plain');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
})

app.get('/alm/alm.js/:tagid', function(req, res) {
  fs.readFile('./alm.js', 'utf8', function(err, data) {
    if (err) throw err;
    console.log(req.params);
    res.send(data);
  });
});

app.post('/alm/pst', function(req, res) {
  // res.header
  // res.setHeader('Access-Control-Allow-Origin', 'https://vinfastgiatot5s.com');
  // res.setHeader('Content-Type', 'application/json');
  // res.setHeader('Access-Control-Allow-Methods', 'POST');
  // res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Origin, Cache-Control, X-Requested-With');
  let params = req.query;
  console.log(params);
  res.send();
});

app.listen(port, function() {
  console.log(`Example app listening at http://localhost:${port}`);
});