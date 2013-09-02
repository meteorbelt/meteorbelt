// Should create an error message
Tinytest.add("belt - flash - error", function (test) {
  Flash.error('test');
  var f = Flash.Collection.findOne();
  test.equal(f.message, 'test');
  test.equal(f.type, 'error');
  test.equal(f.show, true);
  // Cleanup
  Flash.Collection.remove(f._id);
});

// Should create a success message
Tinytest.add("belt - flash - success", function (test) {
  Flash.success('test');
  var f = Flash.Collection.findOne();
  test.equal(f.message, 'test');
  test.equal(f.type, 'success');
  test.equal(f.show, true);
  // Cleanup
  Flash.Collection.remove(f._id);
});

// Should create an info message
Tinytest.add("belt - flash - info", function (test) {
  Flash.info('test');
  var f = Flash.Collection.findOne();
  test.equal(f.message, 'test');
  test.equal(f.type, 'info');
  test.equal(f.show, true);
  // Cleanup
  Flash.Collection.remove(f._id);
});

// Should mark show as false for "seen" messages
Tinytest.add("belt - flash - clear", function (test) {
  // create some message
  var f = [];
  Flash.info('test');
  Flash.error('test');
  Flash.success('test');
  // Mark them as seen
  var ff = Flash.Collection.find();
  ff.forEach(function (f) {
    Flash.Collection.update(f._id, {
      $set: {
        seen: true
      }
    });
  });
  // Change show to false for seen messages
  Flash.clear();
  // Confirm
  var sf = Flash.Collection.find();
  sf.forEach(function (f) {
    test.equal(f.message, 'test');
    test.equal(f.seen, true);
    test.equal(f.show, false);
    // Cleanup
    Flash.Collection.remove(f._id);
  });
});
