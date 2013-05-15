// Tests
// -----

Tinytest.add('belt - settings - Belt.settings is Global', function (test) {
  test.isTrue(typeof Belt.Settings !== 'undefined');
});

var settings = {
  public: {
    str: 'publicStr',
    num: 0,
    obj: {
      a: {
        b: {
          c: 'd'
        }
      }
    }
  },
  str: 'privateStr',
  num: 1,
  obj: {
    a: {
      b: {
        c: 'd'
      }
    }
  }
};

Tinytest.add('belt - settings - add', function (test) {

  Belt.Settings._add(settings);

  var s = Belt.Settings._get();

  test.equal(s.str, 'privateStr');
  test.equal(s.num, 1);
  test.equal(s.obj, {
    a: {
      b: {
        c: 'd'
      }
    }
  });

  var ps = s.public;
  test.equal(ps.str, 'publicStr');
  test.equal(ps.num, 0);
  test.equal(ps.obj, {
    a: {
      b: {
        c: 'd'
      }
    }
  });
});
