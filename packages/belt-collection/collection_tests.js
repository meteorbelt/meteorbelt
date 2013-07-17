
// Test helpers
function resetPosts() {
  _.each(Posts.find().fetch(), function (p) {
    Posts.remove(p._id);
  });
}

/////////////////
// Collections //
/////////////////

var Posts = this.Posts = new Collection(null);

Posts.schema({
  title:       { type: String, required: true },
  body:        { type: String, required: true },
  publishedAt: { type: Date, required: true },
  isPublished: { type: Boolean, 'default': false },
  loudTitle:   String
});

Posts.methods({
  getTitle: function () {
    return this.title;
  }
});

Posts.statics({
  findByTitle: function (title, args) {
    return this.find({title: title}, args);
  }
});

// Posts.before({
//   insert: function (user, doc) {
//     doc.loudTitle = doc.title.toUpperCase();
//   }
// });

var Comments = this.Comments = new Collection(null);

Comments.schema({
  title: { type: String, required: true },
  body:  { type: String, required: true },
  owner: { type: String, required: true }
});

Comments.methods({
  getTitle: function () {
    return this.title.toUpperCase();
  }
});

///////////
// Tests //
///////////

// Docs

var p1 = {
  title: "Hello World",
  body: "Post Body",
  publishedAt: '1/1/2001'
};

// incomplete
var p2 = {
  title: "Hello World",
  body: "Post Body"
};

var c1 = {
  title: "Original?",
  body: "Comment Body"
};

Tinytest.add('belt - collection - Collection is Global', function (test) {
  test.isTrue(typeof Collection !== 'undefined');
});

Tinytest.add('belt - collection - model created', function (t) {

  var p = Posts.create(p1);
  var c = Comments.create(c1);

  t.equal(p.title, p1.title);
  t.equal(p.body, p1.body);
  // check conversion to type
  t.equal(p.publishedAt, new Date('1/1/2001'));

  t.equal(c.title, c1.title);
  t.equal(c.body, c1.body);

  // Test defaults
  t.equal(p.isPublished, false);

});

Tinytest.add('belt - collection - model methods', function (t) {
  var p = Posts.create(p1);
  var c = Comments.create(c1);

  t.equal(p.getTitle(), p1.title);
  t.equal(c.getTitle(), c1.title.toUpperCase());
});

Tinytest.add('belt - collection - collection methods (statics)', function (t) {
  resetPosts();
  p1.title = 'find me';
  Posts.insert(p1);
  var pp = Posts.findByTitle('find me').fetch();
  t.length(pp, 1);
});

Tinytest.add("belt - collection - validate", function (t) {
  t.equal(Posts.validate(p1), null);
  t.equal(Posts.validate(p2), {
    publishedAt: 'required'
  });
});

Tinytest.addAsync('belt - collection - save valid', function (t, done) {
  resetPosts();
  // insert
  Posts.save(p1, function (err, id) {
    t.isNull(err);
    t.isTrue(id && id.length);
    // Check it
    var p = Posts.findOne(id);
    t.equal(p.title, 'Hello World');
    // Update
    p.title = 'Changed';
    Posts.save(p, function (err, id2) {
      t.isNull(err);
      t.isTrue(id2 && id2.length);
      t.equal(id, id2);
      // Check it
      p = Posts.findOne(id2);
      t.equal(p.title, 'Changed');
      done();
    });
  });
});

Tinytest.addAsync('belt - collection - save invalid', function (t, done) {
  resetPosts();
  var expect = {
    error: 401,
    reason: 'Validation Error',
    details: {
      publishedAt: 'required'
    }
  };
  Posts.save(p2, function (err, id) {
    t.equal(err, expect);
    done();
  });
});

Tinytest.addAsync('belt - collection - model save', function (t, done) {
  resetPosts();
  var p1 = {
    title: "Hello World",
    body: "Post Body",
    publishedAt: '1/1/2001'
  };
  var p = Posts.create(p1);
  // insert
  p.save(function (err, id) {
    t.isNull(err);
    t.isTrue(id && id.length);
    // Check it
    p = Posts.findOne(id);
    p = Posts.create(p);
    t.equal(p.title, 'Hello World');
    // Update
    p.title = 'Changed';
    p.save(function (err, id2) {
      t.isNull(err);
      t.isTrue(id2 && id2.length);
      t.equal(id, id2);
      // Check it
      p = Posts.findOne(id2);
      t.equal(p.title, 'Changed');
      done();
    });
  });
});

Tinytest.add("belt - collection - alternative constructor", function (t) {
  var PostAlt = new Collection(null, {
    schema: {
      _id:         { type: String },
      title:       { type: String, required: true },
      body:        { type: String, required: true },
      publishedAt: { type: Date, required: true },
      isPublished: { type: Boolean, 'default': false },
      loudTitle:   String
    },

    methods: {
      getTitle: function () {
        return this.title;
      }
    },

    statics: {
      findByTitle: function (title, args) {
        return this.find({title: title}, args);
      }
    }
  });

  t.equal(PostAlt._schema, Posts._schema);
  t.equal(PostAlt._processors, Posts._processors);
});
