// Publish
// -------
// a single post, identified by slug
Meteor.publish('post', function (slug) {
  return Posts.find({
    slug: slug
  });
});

Meteor.publish('posts', function (query, options) {
  // if not an admin return only published records
  if (! Roles.userIsInRole(this.userId, 'admin')) {
    query.isPublished = true;
  }
  return Posts.find(query, options);
});
