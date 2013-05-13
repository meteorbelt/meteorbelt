// Should create the correct hash
Tinytest.add("belt - md5 - hex", function (test) {
  var h = Belt.MD5.hex('test string');
  test.equal(h, '6f8db599de986fab7a21625b7916589c');
});
