// Publish
// -------
// a single image, identified by slug
Meteor.publish('image', function (id) {
  return Images.find({
    _id: id
  });
});

Meteor.publish('images', function (query, options) {
  return Images.find(query);
});

// Rules
// -----
Images.allow({
  insert: function (userId, images) {
    return Roles.userIsInRole(userId, 'admin');
  },
  update: function (userId, images, fields, modifier) {
    return Roles.userIsInRole(userId, 'admin');
  },
  remove: function (userId, images) {
    return Roles.userIsInRole(userId, 'admin');
  }
});
