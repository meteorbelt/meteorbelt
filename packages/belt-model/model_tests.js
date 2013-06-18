var PRINT_LOGS = true;
// var PRINT_LOGS = false;

var cl = function (msg) {
  if (PRINT_LOGS) {
    console.log(msg);
  }
};

// Instantiate
// -----------
// var Posts = this.Posts = Belt.Model.extend("posts");


var Posts = this.Posts = Belt.Model.extend("posts", {

  schema: {
    title:       { type: String, required: true },
    body:        { type: String, required: true },
    publishedAt: { type: Date, required: true },
    isPublished: { type: Date, required: true, "default": false }
  },

  methods: {
    uppercaseTitle: function () {
      return this.title.toUpperCase();
    }
  },

  statics: {
    findByTitle: function (cls, title) {
      return this.find({title: title});
    }
  },

  before: {
    insert: function (doc) {
      doc.publishedAt = doc.publishedAt ? new Date(doc.publishedAt) : null;
    }
  },

  after: {
    insert: function () {
    }
  }
});

var startsWithHowTo = function (value, attr, computedState) {
  return (/How\ to/i.test(value));
};

// Add late validation
Posts.validate('title', startsWithHowTo, "The title must start with 'How to'");

// Plugins
// -------
// Posts.plugin(Belt.Plugins.createdAt);
// Posts.plugin(Belt.Plugins.updatedAt);
// Posts.plugin(Belt.Plugins.slug, { required: true, attr: "title" });
// Posts.plugin(Belt.Plugins.owner, { required: true });
// Posts.plugin(Belt.Plugins.tags);

// Schema
// ------
/**

Posts.schema({
  title:       { type: String, required: true },
  body:        { type: String, required: true },
  publishedAt: { type: Date, required: true },
  isPublished: { type: Date, required: true, "default": false }
});


if (Meteor.isServer) {
  // Allow all 
  Posts.allow({
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

*/

var Comments = this.Comments = Belt.Model.extend("comments");

// Tests

// Docs

var p1 = this.p1 = {
  title: "Hello World",
  body: "Post Body"
};

var c1 = this.c1 = {
  title: "Original?",
  body: "Comment Body"
};

Tinytest.add('belt - model - Belt.Model is Global', function (test) {
  test.isTrue(typeof Belt.Model !== 'undefined');
});

Tinytest.add('belt - model - model created', function (t) {

  var p = Posts.create(p1);
  var c = Comments.create(c1);

  t.equal(p.title, p1.title);
  t.equal(p.body, p1.body);

  t.equal(c.title, c1.title);
  t.equal(c.body, c1.body);
});

Tinytest.add('belt - model - model methods', function (t) {
  var p = Posts.create(p1);
  var c = Comments.create(c1);

  t.equal(p.uppercaseTitle(), p1.title.toUpperCase());
  t.equal(c.uppercaseTitle(), c1.title.toUpperCase());
});

Tinytest.add('belt - model - restricted access', function (t) {

});

Tinytest.addAsync('belt - model - model save valid', function (t, onComplete) {
  onComplete();
});

Tinytest.addAsync('belt - model - model save invalid', function (t, onComplete) {
  onComplete();
});
