// Tag
// ---
/**
  Tag a class that takes a document in its constructor

    var doc = {
      slug: 'one',
      count: 3
    };

    var tag = Tag(doc);
*/
// Use Belt.Validation
_.extend(Belt.Model.prototype, Belt.Validation.mixin);

var Tag = Belt.Model.extend({
  validation: {
    slug: {
      required: true
    }
  }
});

// Define a Collection that uses Tag as its document
var Tags = new Meteor.Collection('tags', {
  transform: function (doc) {
    return new Tag(doc);
  }
});

// Posts Methods Overrides
// -----------------------
/**
  @param {Object} opts

  opts:
  - owner {String}
  - slug {String}
  - count {Number}
  - createdAt {Date}
*/
Tags.Insert = function (opts) {
  var t = new Tag(opts);
  var err = t.validate();
  if (err) {
    throw new Meteor.Error(403, err);
  }
  // make sure it's slugged
  t.slug = Belt.Slug.get(t.slug);
  var existing = Tags.findOne({
    slug: t.slug
  });
  // if existing return it
  if (existing) {
    // increment the count
    Tags.update({
      _id: existing._id
    }, {
      $inc: {
        count: 1
      }
    });
    return existing._id;
  }
  // other wise create a new one
  t.createdAt = new Date();
  t.count = 1;
  t = t.toObject();
  return Tags.insert(t);
};

// Meteor Methods
// --------------
// Access Control -- only Admins can add tags
var isAdmin = function (reqId) {
    if (!Belt.User.isAdmin(reqId)) {
      throw new Meteor.Error(401, 'Access Denied');
    }
  };

Meteor.methods({
  'Tag.insert': function (opts) {
    // Admin only
    isAdmin(this.userId);
    return Tags.Insert(opts);
  }
});

// Exports
// -------
this.Tag = Tag;
this.Tags = Tags;
