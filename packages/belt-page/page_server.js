// Indexes
// -------
Pages._ensureIndex({
  'slug': 1
}, {
  unique: true
});

// Publish
// -------
// a single page, identified by slug
Meteor.publish('page', function (slug) {
  return Pages.find({
    slug: slug
  });
});
Meteor.publish('pages', function (query, options) {
  return Pages.find(query);
});

// Rules
// -----
Pages.allow({
  insert: function (userId, pages) {
    return Roles.userIsInRole(userId, 'admin');
  },
  update: function (userId, pages, fields, modifier) {
    return Roles.userIsInRole(userId, 'admin');
  },
  remove: function (userId, pages) {
    return Roles.userIsInRole(userId, 'admin');
  }
});
