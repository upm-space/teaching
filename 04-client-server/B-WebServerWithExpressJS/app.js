var express = require('express');
var path = require('path');
var app = express();

app.use('/css', express.static('./html-content/css'));

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/first', function(req, res) {
    res.sendFile(path.join(__dirname, 'html-content', 'first.html'));
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});