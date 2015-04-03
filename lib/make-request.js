var request = require('superagent');
var isString = require('101/is-string');

module.exports = function (query, cb) {
  if (!query || !query.url) {
    var err = new Error('query.url is required');
    err.data = query;
    console.log('ERROR!', err);
    cb(err);
  }
  else {
    request
      .get(query.url)
      .end(function (err, res) {
        if (err) { return cb(err); }
        var body = res.body || res.text;
        console.log('RESPONSE!', query.url, body);
        var bodyStr = isString(body) ? body : JSON.stringify(body);
        cb(null, 'RESPONSE:'+bodyStr);
      });
  }
};
