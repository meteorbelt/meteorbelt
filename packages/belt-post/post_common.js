// Post
// ----
/**
  Post a class that takes a document in its constructor

    var doc = {
      title: 'Hello World',
      body: 'body text'.
      tags: ['one', 'two', 'three'],
      publishedAt: {Date},
      isPublished: true,
      owner: '123',
      slug: 'hello-world'
    };

    var post = new Post(doc);
*/
// Use Belt.Validation
_.extend(Belt.Model.prototype, Belt.Validation.mixin);

var Post = Belt.Model.extend({
  validation: {
    owner: {
      required: true
    },
    tags: {
      fn: function (value, attr, computedState) {
        if (!_.isArray(value)) {
          return 'Tags must be an Array';
        }
      }
    },
    title: {
      required: true
    },
    body: {
      required: true
    }
  }
});

// Define a Collection that uses Post as its document
var Posts = new Meteor.Collection('posts', {
  transform: function (doc) {
    return new Post(doc);
  }
});

// Posts Methods Overrides
// -----------------------
/**
  @param {Object} opts

  opts:
  - owner {String}
  - title {String}
  - body {String}
  - tags {Array}{String}
  - publishedAt {Date}
  - isPublished {Boolean}
  - slug {Array} Optional
*/
Posts.Insert = function (opts) {
  var p = new Post(opts);
  var err = p.validate();
  if (err) {
    throw new Meteor.Error(403, err);
  }
  // if slug is present return an error if it is in use
  if (opts.slug) {
    p.slug = Belt.Slug.unique(opts.slug, Posts, true);
  } else {
    // use the title, don't care if the slug is an exact match
    p.slug = Belt.Slug.unique(opts.title, Posts);
  }
  var now = new Date();
  // remove prototype attributes
  p = p.toObject();
  p.createdAt = now;
  p.updatedAt = now;
  // tags must be slugs
  if (p.tags) {
    p.tags = _.map(p.tags, function (t) {
      return Belt.Slug.get(t);
    });
  }
  if (p.publishedAt) {
    p.publishedAt = new Date(p.publishedAt);
  } else {
    p.publishedAt = now;
  }
  var val = Posts.insert(p);
  // Save the tags to the Tags Collection
  _.each(p.tags, function (t) {
    if (t) {
      Tags.Insert({
        owner: p.owner,
        slug: t
      });
    }
  });
  return val;
};

/**
  @param {Object} opts

  opts:
  - _id {String}
  - title {String}
  - body {String}
  - tags {Array}{String}
  - publishedAt {Date}
  - isPublished {Boolean}
  - slug {Array} Optional
 */
Posts.Update = function (opts) {
  var p = new Post(opts);
  var err = p.validate();
  if (err) {
    throw new Meteor.Error(403, err);
  }
  // tags must be slugs
  if (p.tags) {
    p.tags = _.map(p.tags, function (t) {
      return Belt.Slug.get(t);
    });
  }
  // remove prototype attributes
  p = p.toObject();

  var doc = {
    title: p.title,
    body: p.body,
    tags: p.tags,
    isPublished: p.isPublished,
    publishedAt: new Date(p.publishedAt),
    // slugify again for good measure
    slug: Belt.Slug.get(p.slug),
    updatedAt: new Date()
  };
  var val = Posts.update(opts._id, {
    $set: doc
  });
  // Save the tags to the Tags Collection
  _.each(p.tags, function (t) {
    if (t) {
      Tags.Insert({
        owner: p.owner,
        slug: t
      });
    }
  });
  return val;
};

// Meteor Methods
// --------------
// Access Control -- verify that the user is modifying their profile
// or the modification is being made by an admin.
var ownerOrAdmin = function (reqId, ownerId) {
    if (!Belt.User.ownerOrAdmin(reqId, ownerId)) {
      throw new Meteor.Error(401, 'Access Denied');
    }
  };

var isAdmin = function (reqId) {
    if (!Belt.User.isAdmin(reqId)) {
      throw new Meteor.Error(401, 'Access Denied');
    }
  };

Meteor.methods({
  'Post.insert': function (opts) {
    // Admin only
    isAdmin(this.userId);
    return Posts.Insert(opts);
  },
  'Post.update': function (opts) {
    isAdmin(this.userId);
    return Posts.Update(opts);
  }
});

// Exports
// -------
this.Post = Post;
this.Posts = Posts;
