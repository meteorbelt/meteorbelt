// Indexes
// -------
Tags._ensureIndex({
  'slug': 1
}, {
  unique: true
});

// Publish
// -------
// a single tag, identified by slug
Meteor.publish('tag', function (slug) {
  return Tags.find({
    slug: slug
  });
});

Meteor.publish('tags', function (query, options) {
  return Tags.find(query, options);
});

// Rules
// -----
Tags.allow({
  insert: function (userId, doc) {
    return Roles.userIsInRole(userId, 'admin');
  },
  update: function (userId, docs, fields, modifier) {
    return Roles.userIsInRole(userId, 'admin');
  },
  remove: function (userId, docs) {
    return Roles.userIsInRole(userId, 'admin');
  }
});
