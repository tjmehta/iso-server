var qs = require('querystring');
var makeRequest = require('make-request');

try {
  var query = qs.parse(window.location.search.slice(1));
  makeRequest(query, function (err, bodyStr) {
    if (err) { return handleErr(err); }
    writeBody(bodyStr);
  });
}
catch (err) {
  handleErr(err);
}

function handleErr (err) {
  console.log('handleErr', arguments);
  writeBody('Error: '+err.message);
}

function writeBody (str) {
  console.log('writeBody', arguments);
  document.body.innerHTML = str;
}
