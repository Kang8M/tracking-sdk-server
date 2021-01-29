const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

app.get('/', function(req, res) {
  res.send('Hello world!');
});

app.post('/alm', function(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'multipart/form-data');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Origin, Cache-Control, X-Requested-With');
  let params = req.params;
  console.log(params);
});

app.listen(port, function() {
  console.log(`Example app listening at http://localhost:${port}`);
});