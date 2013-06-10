// Indexes
// -------
// Posts._Collection._ensureIndex({
//   'slug': 1
// }, {
//   unique: true
// });
//
// Posts._Collection._ensureIndex({
//   'owner': 1
// });
//
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
  if (!Roles.userIsInRole(this.userId, 'admin')) {
    query.isPublished = true;
  }
  return Posts.find(query, options);
});

// Rules
// -----
// Posts.allow({
//   insert: function (userId, posts) {
//     return true;
//     //return Roles.userIsInRole(userId, 'admin');
//   },
//   update: function (userId, posts, fields, modifier) {
//     return Roles.userIsInRole(userId, 'admin');
//   },
//   remove: function (userId, posts) {
//     return Roles.userIsInRole(userId, 'admin');
//   }
// });
