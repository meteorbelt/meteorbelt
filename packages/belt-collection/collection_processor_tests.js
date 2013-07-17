/**
 * This file includes code influenced by
 * https://github.com/matb33/meteor-collection-hooks
 *
 * (c) 2013 Mathieu Bouchard
 */

Tinytest.addAsync("belt - collection - processors - before insert", function (test, next) {
  var C = new Collection(null);

  test.equal(C.find({a: 1}).count(), 0);

  C.before({
    insert: function (userId, doc) {
      test.equal(C.find({a: 1}).count(), 0);
      doc.b = 2;
    }
  });

  C.insert({a: 1}, function (err, id) {
    test.equal(C.find({a: 1, b: 2}).count(), 1);
    next();
  });
});

Tinytest.addAsync("belt - collection - processors - after insert", function (test, next) {
  var C = new Collection(null);

  test.equal(C.find({a: 1}).count(), 0);

  C.after({
    insert: function (userId, doc) {
      test.equal(doc.a, 1);
      test.equal(C.find({a: 1}).count(), 1);
      next();
    }
  });

  C.insert({a: 1}, function (err, id) {
    test.equal(C.find({a: 1}).count(), 1);
  });
});

Tinytest.add("belt - collection - processors - before update", function (test) {
  var C = new Collection(null);

  test.equal(C.find({a: 1}).count(), 0);

  C.insert({a: 1}, function (err, id) {
    test.equal(C.find({a: 1}).count(), 1);
    test.equal(C.find({a: 1, b: 2}).count(), 0);

    C.before({
      update: function (userId, selector, modifier, options) {
        test.equal(C.find({a: 1, b: 2}).count(), 0);
        modifier.$set.c = 3;
      }
    });

    C.update(id, {$set: {b: 2}}, {}, function (err) {
      test.equal(C.find({a: 1, b: 2, c: 3}).count(), 1);
    });
  });
});

Tinytest.addAsync("belt - collection - processors - after update", function (test, next) {
  var C = new Collection(null);

  test.equal(C.find({a: 1}).count(), 0);

  C.insert({a: 1}, function (err, id) {
    test.equal(C.find({a: 1}).count(), 1);

    C.after({
      update: function (userId, selector, modifier, options, previous) {
        test.equal(C.find({a: 1, b: 2}).count(), 1);

        test.length(previous, 1);
        if (previous.length === 1) {
          test.equal(previous[0].a, 1);
          test.isUndefined(previous[0].b);
        }

        next();
      }
    });

    C.update(id, {$set: {b: 2}});
  });
});

Tinytest.addAsync("belt - collection - processors - after update with options omitted and callback specified", function (test, next) {
  var C = new Collection(null);

  var pass_count = 0;
  var pass = function () {
    if (++pass_count === 2) next();
  };

  test.equal(C.find({a: 1}).count(), 0);

  C.insert({a: 1}, function (err, id) {
    test.equal(C.find({a: 1}).count(), 1);

    C.after({
      update: function (userId, selector, modifier, options, previous) {
        test.equal(C.find({a: 1, b: 2}).count(), 1);

        test.length(previous, 1);
        if (previous.length === 1) {
          test.equal(previous[0].a, 1);
          test.isUndefined(previous[0].b);
        }

        pass();
      }
    });

    // Third parameter would normally be "options", but we are omitting it
    // and putting the callback in its place. This requires special
    // behavior on the part of collection-hooks to mimic the behavior
    // by Meteor's own update.
    C.update(id, {$set: {b: 2}}, function (err) {
      test.isUndefined(err);
      pass();
    });
  });
});

Tinytest.addAsync("belt - collection - processors - before remove", function (test, next) {
  var C = new Collection(null);

  test.equal(C.find({a: 1}).count(), 0);

  C.insert({a: 1}, function (err, id) {
    var b = null;

    test.equal(C.find({a: 1}).count(), 1);

    C.before({
      remove: function (userId, selector) {
        test.equal(C.find({a: 1}).count(), 1);
        b = 2;
      }
    });

    C.remove(id, function (err) {
      test.equal(C.find({a: 1}).count(), 0);
      test.equal(b, 2);
      next();
    });
  });
});

Tinytest.addAsync("belt - collection - processors - after remove", function (test, next) {
  var C = new Collection(null);

  test.equal(C.find({a: 1}).count(), 0);

  C.insert({a: 1}, function (err, id) {

    test.equal(C.find({a: 1}).count(), 1);

    C.after({
      remove: function (userId, selector, previous) {
        test.equal(C.find({a: 1}).count(), 0);

        test.length(previous, 1);
        if (previous.length === 1) {
          test.equal(previous[0].a, 1);
        }

        next();
      }
    });

    C.remove(id);
  });
});

/*
//write these later
Tinytest.addAsync("belt - collection - processors - multiple before hooks on same collection", function (test, next) {
  next();
});

Tinytest.addAsync("belt - collection - processors - multiple after hooks on same collection", function (test, next) {
  next();
});
*/
