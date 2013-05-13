var PRINT_LOGS = true;
//var PRINT_LOGS = false;
var debug = function (msg) {
  if (PRINT_LOGS) {
    console.log(msg);
  }
};

// X
// -
var X = new Belt.Collection('x');

X.schema = {
  num: {
    pattern: 'number'
  },
  //str: {
  //  pattern: 'string'
  //},
  num2: {
    fn: function (value, attr, computedState) {
      if (value !== 2) {
        return 'num2 must be 2';
      }
    }
  }
};

X.methods({
  one: function () {
    return 'one';
  },
  two: function () {
    return 'two';
  }
});

X.pre({
  insert: function (userId, docs) {
    return docs;
  }
});

if (Meteor.isServer) {
  X.allow({
    insert: function (userId, docs) {
      return true;
    },
    update: function (userId, docs, fields, modifier) {
      return true;
    },
    remove: function (userId, docs) {
      return true;
    }
  });
}


// Z
// -
var Z = new Belt.Collection('z');

Z.schema = {

};

Z.methods({
  one: function () {
    return 1;
  },
  two: function () {
    return 2;
  }
});

if (Meteor.isServer) {
  Z.allow({
    insert: function (userId, docs) {
      return true;
    },
    update: function (userId, docs, fields, modifier) {
      return true;
    },
    remove: function (userId, docs) {
      return true;
    }
  });
}

// Tests
// -----

Tinytest.add('belt - collection - Belt.Collection is Global', function (test) {
  test.isTrue(typeof Belt.Collection !== 'undefined');
});

Tinytest.add('belt - collection - model methods', function (test) {
  // X
  var xDoc = {
    str: 'hello',
    num: 1,
    num2: 2
  };
  var x = X.create(xDoc);
  // Test methods - should return strings
  test.equal(x.one(), 'one');
  test.equal(x.two(), 'two');

  // Z
  var zDoc = {
    str: 'hello',
    num: 1,
    num2: 2
  };
  var z = Z.create(zDoc);
  // Test methods - should return numbers
  test.equal(z.one(), 1);
  test.equal(z.two(), 2);
});

Tinytest.addAsync('belt - collection - model save valid', function (test, onComplete) {
  var xDoc = {
    str: 'hello',
    num: 1,
    num2: 2
  };
  var x = X.create(xDoc);
  x.save(function (err, id) {
    test.isFalse(err);
    test.isTrue(id);
    debug('valid -- save err: ', err);
    debug('valid -- save id: ', id);
    // confirm saved
    // XXX this is only checking the client. We can't be sure that
    // has made it to the datastore
    // var e = X.findOne(id);
    // test.isTrue(e);
    onComplete();
  });
});

Tinytest.addAsync('belt - collection - model save invalid', function (test, onComplete) {
  var xDoc = {
    str: 0,
    num: 'hello'
  };
  var x = X.create(xDoc);
  // Save
  // ----
  x.save(function (err, id) {
    test.isFalse(id);
    test.equal(id, null);
    test.isTrue(err);
    test.equal(err.error, 401);
    test.equal(err.message, {
      "num": "Num must be a valid number",
      "num2": "num2 must be 2"
    });
    onComplete();
  });
});

// TODO test invalid. Setting X.allow() twice is causing problems
// Tinytest.add('belt - collection - restricted access', function (test) {
//   if (Meteor.isServer) {
//     X.allow({
//       insert: function (userId, docs) {
//         return false;
//       },
//       update: function (userId, docs, fields, modifier) {
//         return false;
//       },
//       remove: function (userId, docs) {
//         return false;
//       }
//     });
//   }
//
//   if (Meteor.isClient) {
//     var doc = {
//       price: 5,
//       multiplier: 2
//     };
//     var x = X.create(doc);
//     // Methods
//     // ------
//     test.equal(x.markup(), 10);
//
//     // Instance
//     // --------
//     // Save
//     // ----
//     x.save(function (err, id) {
//       test.equal(err.error, 403);
//       test.equal(err.message, 'Access denied');
//       test.equal(id, null);
//       debug('restricted -- save err: ', err);
//       debug('restricted -- save id: ', id);
//     });
//   }
// });
