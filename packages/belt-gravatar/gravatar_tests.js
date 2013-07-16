// Should create the correct hash
Tinytest.add("belt - gravatar - urlFromEmail with no params", function (test) {
  var url = Gravatar.urlFromEmail('hello@meteorbelt.com');
  test.equal(url, 'http://www.gravatar.com/avatar/44e00c6d4a1deab14c40c00c89844cac');
});

Tinytest.add("belt - gravatar - urlFromEmail with params", function (test) {
  var params = {
    secure: true, // https ?
    d: encodeURIComponent('http://example.org'), // defalut
    s: 200, // size
    r: 'pg' // rating
  };
  var url = Gravatar.urlFromEmail('hello@meteorbelt.com', params);
  test.equal(url, 'https://www.gravatar.com/avatar/44e00c6d4a1deab14c40c00c89844cac?d=http%3A%2F%2Fexample.org&s=200&r=pg');
});
