var now = new Date();

var tags = [
  // complete
  {
    owner: '123',
    slug: 'Hello World'
  },
  {
    owner: '123',
    slug: 'Goodbye World'
  },
  // missing slug
  {
    owner: '123',
  }
];

var cleanup = function (ids) {
    _.each(ids, function (id) {
      Tags.remove(id);
    });
  };

Tinytest.add('belt - tags - validate', function (test) {
  var ids = [];
  var id, t, err;
  // Valid
  t = new Tag(tags[0]);
  err = t.validate();
  test.equal(err, undefined);
  // Invalid
  t = new Tag(tags[2]);
  err = t.validate();
  test.equal(err, {
    slug: 'Slug is required'
  });
});

Tinytest.add('belt - tags - Insert', function (test) {
  var ids = [];
  var t, expect;

  var id1 = Tags.Insert(tags[0], '123');
  ids.push(id1);
  // check it
  t = Tags.findOne(id1);
  expect = {
    owner: '123',
    slug: 'hello-world',
    count: 1
  };
  _.each(expect, function (value, key, list) {
    test.equal(t[key], value);
  });

  // Again should bump count
  var id2 = Tags.Insert(tags[0], '123');
  ids.push(id2);
  // check it
  t = Tags.findOne(id2);
  expect = {
    // We want to return the same doc.
    // Therefore, the ids should match.
    _id: id1,
    owner: '123',
    slug: 'hello-world',
    count: 2
  };
  _.each(expect, function (value, key, list) {
    test.equal(t[key], value);
  });

  var id3 = Tags.Insert(tags[1], '123');
  ids.push(id3);
  // check it
  t = Tags.findOne(id3);
  expect = {
    owner: '123',
    slug: 'goodbye-world',
    count: 1
  };
  _.each(expect, function (value, key, list) {
    test.equal(t[key], value);
  });

  // Tags count
  test.equal(Tags.find().count(), 2);

  cleanup(ids);
});
