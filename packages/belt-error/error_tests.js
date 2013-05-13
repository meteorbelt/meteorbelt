Tinytest.add('belt - error - BeltError', function (test) {
  test.isTrue(typeof Belt.Error !== 'undefined');

  var e = new Belt.Error('TestError');
  test.equal(e.name, 'BeltError');
  test.equal(e.message, 'TestError');
  test.equal(e.toString(), 'BeltError: TestError');
});
