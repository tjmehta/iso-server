var qs = require('querystring');
var request = require('superagent');
var isBrowser = typeof window !== 'undefined';

module.exports = function (req, res) {
  var opts = getOpts(req);
  console.log(opts, window.location, qs.parse(window.location.search))
  opts.body = opts.body || {};
  var queryStr = opts.query ? '?' + qs.parse(opts.query) : '';
  request
    .post(opts.url + queryStr)
    .send(opts.body)
    .end(handleRes);
  // utils
  function getOpts () {
    return isBrowser ?
      qs.parse(window.location.search ? window.location.search.slice(1) : '') :
      req.query;
  }

  function handleRes (err, res) {
    if (err) { return writeBody(err.message); }
    writeBody((typeof res.body === 'object') ? JSON.stringify(res.body): res.body);
  }

  function writeBody (str) {
    if (isBrowser) {
      document.body.innerHTML = str;
    }
    else {
      res.write(str);
      res.end();
    }
  }
};
