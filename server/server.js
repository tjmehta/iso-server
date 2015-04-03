var express = require('express');
var makeRequest = require('make-request');
var app = express();

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/', function (req, res, next) {
  res.send('yo');
});

app.use('/client', express.static('client'));

app.get('/server', function (req, res, next) {
  makeRequest(req.query || {}, function (err, bodyStr) {
    if (err) {
      res.send('ERROR: '+err.message);
    }
    else {
      res.send(bodyStr);
    }
  });
});

app.post('/query', function (req, res, next) {
  res.json({
    hello: "hello",
    body : req.body,
    query: req.query
  });
});

app.listen(process.env.PORT || 3030);
