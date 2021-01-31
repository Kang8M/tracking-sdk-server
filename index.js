const express = require('express');
const bodyParser = require("body-parser");
// const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

// app.use(cors({ origin: '*' }));

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.send('Hello world!');
});

app.post('/alm', function(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Origin, Cache-Control, X-Requested-With');
  let params = req.body;
  res.send(params);
});

app.listen(port, function() {
  console.log(`Example app listening at http://localhost:${port}`);
});