var PRINT_LOGS = true;
// var PRINT_LOGS = false;

var cl = function (msg) {
  if (PRINT_LOGS) {
    console.log(msg);
  }
};

// Instantiate
// -----------
var Posts = this.Posts = new Belt.Collection("posts");

// var Posts = this.Posts = Belt.Collection.extend("posts");

// Plugins
// -------
// Posts.plugin(Belt.Plugins.createdAt);
// Posts.plugin(Belt.Plugins.updatedAt);
// Posts.plugin(Belt.Plugins.slug, { required: true, attr: "title" });
// Posts.plugin(Belt.Plugins.owner, { required: true });
// Posts.plugin(Belt.Plugins.tags);

// Schema
// ------
Posts.schema({
  title:       { type: String, required: true },
  body:        { type: String, required: true },
  publishedAt: { type: Date, required: true },
  isPublished: { type: Date, required: true, "default": false }
});

var startsWithHowTo = function (value, attr, computedState) {
  return /How\ to/i.test(value);
};

// Add late validation
Posts.validate('title', startsWithHowTo, "The title must start with 'How to'");

// Model Methods
Posts.methods({
  uppercaseTitle: function () {
    return this.title.toUpperCase();
  }
});

// Collection Methods
Posts.statics({
  findByTitle: function (cls, title) {
    return this.find({title: title});
  }
});

// Before Crud operations on Collections
Posts.before({
  insert: function (doc) {
    doc.publishedAt = doc.publishedAt ? new Date(doc.publishedAt) : null;
  }
});

// After Crud operations on Collections
Posts.after({
  insert: function () {
  }
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


// var Comments = this.Comments = new Belt.Collection("posts");

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

Tinytest.add('belt - collection - Belt.Collection is Global', function (test) {
  test.isTrue(typeof Belt.Collection !== 'undefined');
});

Tinytest.add('belt - collection - model created', function (t) {
  var m = Posts.create(p1);
  t.equal(m.title, p1.title);
  t.equal(m.description, p1.description);
});

Tinytest.add('belt - collection - model methods', function (t) {
  var m = Posts.create(p1);
  t.equal(m.uppercaseTitle(), p1.title.toUpperCase());
});

Tinytest.add('belt - collection - restricted access', function (t) {

});

Tinytest.addAsync('belt - collection - model save valid', function (t, onComplete) {

});

Tinytest.addAsync('belt - collection - model save invalid', function (t, onComplete) {
});
