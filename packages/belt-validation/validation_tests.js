// Config
// ------
_.extend(Belt.Model.prototype, Belt.Validation.mixin);

// Model
// -----
var A = Belt.Model.extend({
  multiplier: 2,
  validation: {
    str: {
      required: true
    },
    num: {
      pattern: 'number'
    },
    onlyThree: {
      fn: function (value, attr, computedState) {
        if (value !== 3) {
          return 'onlyThree must be 3';
        }
      }
    }
  }
});

Tinytest.add('belt - validation - Belt.Validate is Global', function (test) {
  test.isTrue(typeof Belt.Validation !== 'undefined');
});

Tinytest.add('belt - validation - valid', function (test) {
  var doc = {
    str: 'string',
    num: 5,
    arr: [1, 2, 3],
    onlyThree: 3,
    obj: {
      one: 1,
      two: 2
    }
  };
  var a = new A(doc);
  test.isFalse(a.validate());
});

Tinytest.add('belt - validation - invalid', function (test) {
  var doc = {
    num: '5a',
    arr: [1, 2, 3],
    onlyThree: 'not three',
    obj: {
      one: 1,
      two: 2
    }
  };
  var a = new A(doc);
  test.equal(a.validate(), {
    str: 'Str is required',
    num: 'Num must be a valid number',
    onlyThree: 'onlyThree must be 3'
  });
});
