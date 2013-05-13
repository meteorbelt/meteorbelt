var now = new Date();

var posts = [
    // complete
  {
    owner: '123',
    title: 'Hello World',
    body: 'body text',
    tags: ['one', 'two', 'three'],
    publishedAt: now,
    isPublished: true,
    slug: 'custom-slug'
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
      Posts.remove(id);
    });
  };

Tinytest.add('belt - post - validate', function (test) {
  var ids = [];
  var id, p, err;
  // Valid
  p = new Post(posts[0]);
  err = p.validate();
  test.equal(err, undefined);
  // Invalid
  p = new Post(posts[4]);
  err = p.validate();
  test.equal(err, {
    owner: 'Owner is required',
    tags: 'Tags must be an Array',
    title: 'Title is required',
    body: 'Body is required'
  });
});

Tinytest.add('belt - post - Posts.Insert - complete', function (test) {
  var ids = [];
  var id, p, expect;

  id = Posts.Insert(posts[0], '123');
  ids.push(id);
  // check it
  p = Posts.findOne(id);
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
    id = Post.insert(posts[0]);
    ids.push(id);
  });

  cleanup(ids);
});

Tinytest.add('belt - post - Posts.Insert - incomplete', function (test) {
  var ids = [];
  var id, p, expect;

  id = Posts.Insert(posts[1]);
  ids.push(id);
  // check it
  p = Posts.findOne(id);
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
  id = Posts.Insert(posts[1]);
  ids.push(id);
  // check it
  p = Posts.findOne(id);
  test.equal(p.slug, 'hello-world-1');

  // if PublishedAt is blank use current date
  id = Posts.Insert(posts[2]);
  ids.push(id);
  // check it
  p = Posts.findOne(id);
  test.isTrue(p.publishedAt);
  test.equal(p.publishedAt, p.createdAt);

  cleanup(ids);
});


Tinytest.add('belt - post - Posts.Update - complete', function (test) {
  var ids = [];
  var id, p;
  id = Posts.Insert(posts[0]);
  ids.push(id);

  // get it
  p = Posts.findOne(id);

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

  Posts.Update(p);

  // get it again
  p = Posts.findOne(id);

  // Check it
  _.each(nv, function (value, key, list) {
    test.equal(p[key], value);
  });

  cleanup(ids);
});

/**

TODO: test "Post.insert" & "Post.update"
- Need to create Mock users for this.
Tinytest.add('belt - post - Methods - "Post.insert"', function (test) {
  var err, ids = [];

  // Not logged in
  Meteor.call('Post.insert', posts[0], function (err, id) {
    test.isTrue(err);
    test.isFalse(id);
    test.equal(err.reason, 'Access Denied');
  });

  // Logged in -- owner == user._id
  var user = {
    _id: '123'
  };
  Meteor.call('Test.setUserId', user, function (err, id) {
    Meteor.call('Post.insert', posts[0], function (err, id) {
      //test.isFalse(err);
      //test.isTrue(id);
      test.equal(err);
      test.equal(id);
      // Get it
      var p = Posts.findOne(id);
      console.log(p);
      test.equal(p.owner, '123');
      test.equal(p.title, posts[0].title);
      cleanup([p._id]);
    });

  });
});

Tinytest.add('belt - post - Methods - "Post.update"', function (test) {
  // Access denied

  // Admin

  // Owner

});
*/
