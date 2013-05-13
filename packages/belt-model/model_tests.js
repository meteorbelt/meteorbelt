Tinytest.add('belt - model - Belt.Model is Global', function (test) {
  test.isTrue(typeof Belt.Model !== 'undefined');
});

Tinytest.add('belt - model - extend', function (test) {
  var doc = {
    price: 5
  };
  var A = Belt.Model.extend({
    multiplier: 2,
    markup: function () {
      return this.price * this.multiplier;
    },
    rich: function () {
      return false;
    }
  });
  var B = A.extend({
    // will be overridden by doc
    price: 1,
    // override parent attribute
    multiplier: 3,
    // override parent method
    rich: function () {
      return true;
    }
  });
  // Model A `markup` should add 5 to `price`
  var a = new A(doc);
  test.equal(a.multiplier, 2);
  test.equal(a.price, 5);
  test.equal(a.markup(), 10);
  test.isFalse(a.rich());
  // Model B should extend A but override attributes and methods
  var b = new B(doc);
  test.equal(b.multiplier, 3);
  test.equal(b.price, 5);
  test.equal(b.markup(), 15);
  test.isTrue(b.rich());
});

Tinytest.add('belt - model - validate', function (test) {
  var doc, a;
  var A = Belt.Model.extend({
    validate: function () {
      var err = {};
      if (!_.isString(this.str)) {
        err.str = 'Str must be a String';
      }
      if (!_.isNumber(this.num)) {
        err.num = 'Num must be a Number';
      }
      console.log('err', err);
      return _.isEmpty(err) ? '' : err;
    }
  });
  // Valid
  doc = {
    str: 'string',
    num: 5,
    arr: [1, 2, 3],
    obj: {
      one: 1,
      two: 2
    }
  };
  // Model A mark should add 5
  a = new A(doc);
  test.equal(a.validate(), '');
  // in-Valid
  doc = {
    str: 1,
    num: 'string',
    arr: [1, 2, 3],
    obj: {
      one: 1,
      two: 2
    }
  };
  a = new A(doc);
  test.equal(a.validate(), {
    str: 'Str must be a String',
    num: 'Num must be a Number'
  });
});
