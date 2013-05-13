// Gravatar package provides functions for interacting with the
// Gravatar API (http://en.gravatar.com/site/implement/images/)

var obj = {};
var BASE_URL = '://www.gravatar.com/avatar/';

var urlify = function (val, key) {
  return key + "=" + val;
};

// urlByHash takes an email hash and
// opts s, d
obj.urlFromHash = function (hash, opts) {
  opts = opts || {};
  var protocol = opts.secure ? 'https' : 'http';
  delete opts.secure;
  var url = protocol + BASE_URL + hash;
  var params = _.map(opts, urlify).join('&');
  if (params !== '') {
    url += '?' + params;
  }
  return url;
};

obj.urlFromEmail = function (email, opts) {
  var hash = Belt.MD5.hash(email.trim().toLowerCase());
  return this.urlFromHash(hash, opts);
};

Belt.Gravatar = obj;
