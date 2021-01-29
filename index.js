const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

app.get('/', function(req, res) {
  res.send('Hello world!');
});

app.post('/alm', function(req, res) {
  let params = req.params;
  res.send(params);
});

app.listen(port, function() {
  console.log(`Example app listening at http://localhost:${port}`);
});