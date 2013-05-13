var now = new Date();

var images = [
  // complete
  {
    owner: '123',
    filename: 'Hello World',
    url: 'http://example.com/example.png',
    caption: 'Caption goes here.',
    //size: 3000,
    tags: ['one', 'two', 'three'],
    createdAt: now
  },
  // missing slug
  {
    owner: '123',
    title: 'Hello World',
    body: 'body text',
    tags: ['one', 'two', 'three'],
    publishedAt: now,
    isPublished: true
  },
  // missing publishedAt
  {
    owner: '123',
    title: 'Hello World',
    body: 'body text',
    tags: ['one', 'two', 'three'],
    isPublished: true
  },
    // invalid
  {
    tags: 'no an array'
  }
];

var cleanup = function (ids) {
    _.each(ids, function (id) {
      Images.remove(id);
    });
  };

Tinytest.add('belt - image - validate', function (test) {
  var ids = [];
  var id, p, err;
  // Valid
  p = new Image(images[0]);
  err = p.validate();
  test.equal(err, undefined);
  // Invalid
  p = new Image(images[4]);
  err = p.validate();
  test.equal(err, {
    owner: 'Owner is required',
    tags: 'Tags must be an Array',
    title: 'Title is required',
    body: 'Body is required'
  });
});

Tinytest.add('belt - image - Images.Insert - complete', function (test) {
  var ids = [];
  var id, p, expect;

  id = Images.Insert(images[0], '123');
  ids.push(id);
  // check it
  p = Images.findOne(id);
  expect = {
    owner: '123',
    title: 'Hello World',
    body: 'body text',
    tags: ['one', 'two', 'three'],
    slug: 'custom-slug',
    publishedAt: now,
    isPublished: true
  };
  _.each(expect, function (value, key, list) {
    test.equal(p[key], value);
  });
  // Again should raise error on slug
  test.throws(function () {
    id = Image.insert(images[0]);
    ids.push(id);
  });

  cleanup(ids);
});

Tinytest.add('belt - image - Images.Insert - incomplete', function (test) {
  var ids = [];
  var id, p, expect;

  id = Images.Insert(images[1]);
  ids.push(id);
  // check it
  p = Images.findOne(id);
  expect = {
    owner: '123',
    title: 'Hello World',
    body: 'body text',
    tags: ['one', 'two', 'three'],
    slug: 'hello-world',
    publishedAt: now,
    isPublished: true
  };
  _.each(expect, function (value, key, list) {
    test.equal(p[key], value);
  });
  // Again should create new slug
  id = Images.Insert(images[1]);
  ids.push(id);
  // check it
  p = Images.findOne(id);
  test.equal(p.slug, 'hello-world-1');

  // if PublishedAt is blank use current date
  id = Images.Insert(images[2]);
  ids.push(id);
  // check it
  p = Images.findOne(id);
  test.isTrue(p.publishedAt);
  test.equal(p.publishedAt, p.createdAt);

  cleanup(ids);
});


Tinytest.add('belt - image - Images.Update - complete', function (test) {
  var ids = [];
  var id, p;
  id = Images.Insert(images[0]);
  ids.push(id);

  // get it
  p = Images.findOne(id);

  // update it
  var nv = {
    owner: '123',
    title: 'Goodbye World',
    body: 'new body',
    tags: ['1', '2', '3'],
    // slug should be the same
    slug: 'new-slug',
    publishedAt: new Date(),
    isPublished: false
  };
  p.title = nv.title;
  p.body = nv.body;
  p.tags = nv.tags;
  p.slug = nv.slug;
  p.publishedAt = nv.publishedAt;
  p.isPublished = nv.isPublished;

  Images.Update(p);

  // get it again
  p = Images.findOne(id);

  // Check it
  _.each(nv, function (value, key, list) {
    test.equal(p[key], value);
  });

  cleanup(ids);
});

/**

TODO: test "Image.insert" & "Image.update"
- Need to create Mock users for this.
Tinytest.add('belt - image - Methods - "Image.insert"', function (test) {
  var err, ids = [];

  // Not logged in
  Meteor.call('Image.insert', images[0], function (err, id) {
    test.isTrue(err);
    test.isFalse(id);
    test.equal(err.reason, 'Access Denied');
  });

  // Logged in -- owner == user._id
  var user = {
    _id: '123'
  };
  Meteor.call('Test.setUserId', user, function (err, id) {
    Meteor.call('Image.insert', images[0], function (err, id) {
      //test.isFalse(err);
      //test.isTrue(id);
      test.equal(err);
      test.equal(id);
      // Get it
      var p = Images.findOne(id);
      console.log(p);
      test.equal(p.owner, '123');
      test.equal(p.title, images[0].title);
      cleanup([p._id]);
    });

  });
});

Tinytest.add('belt - image - Methods - "Image.update"', function (test) {
  // Access denied

  // Admin

  // Owner

});
*/
