// Should create an error message
Tinytest.add("belt - flash - error", function (test) {
  Belt.Flash.error('test');
  var f = Belt.Flash.Collection.findOne();
  test.equal(f.message, 'test');
  test.equal(f.type, 'error');
  test.equal(f.show, true);
  // Cleanup
  Belt.Flash.Collection.remove(f._id);
});

// Should create a success message
Tinytest.add("belt - flash - success", function (test) {
  Belt.Flash.success('test');
  var f = Belt.Flash.Collection.findOne();
  test.equal(f.message, 'test');
  test.equal(f.type, 'success');
  test.equal(f.show, true);
  // Cleanup
  Belt.Flash.Collection.remove(f._id);
});

// Should create an info message
Tinytest.add("belt - flash - info", function (test) {
  Belt.Flash.info('test');
  var f = Belt.Flash.Collection.findOne();
  test.equal(f.message, 'test');
  test.equal(f.type, 'info');
  test.equal(f.show, true);
  // Cleanup
  Belt.Flash.Collection.remove(f._id);
});

// Should mark show as false for "seen" messages
Tinytest.add("belt - flash - clear", function (test) {
  // create some message
  var f = [];
  Belt.Flash.info('test');
  Belt.Flash.error('test');
  Belt.Flash.success('test');
  // Mark them as seen
  var ff = Belt.Flash.Collection.find();
  ff.forEach(function (f) {
    Belt.Flash.Collection.update(f._id, {
      $set: {
        seen: true
      }
    });
  });
  // Change show to false for seen messages
  Belt.Flash.clear();
  // Confirm
  var sf = Belt.Flash.Collection.find();
  sf.forEach(function (f) {
    test.equal(f.message, 'test');
    test.equal(f.seen, true);
    test.equal(f.show, false);
    // Cleanup
    Belt.Flash.Collection.remove(f._id);
  });
});
