const express = require('express');
const app = express();
const port = 5000;

app.get('/', function(req, res) {
  res.send('Hello world!');
});

app.listen(port, function() {
  console.log(`Example app listening at http://localhost:${port}`);
});