var express = require('express');
var makeQueryRequest = require('make-query-request');
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
  makeQueryRequest(req, res);
});

app.post('/query', function (req, res, next) {
  res.json({
    hello: "hello",
    body : req.body,
    query: req.query
  });
});

app.listen(3030);
