//
// Rules
//
Meteor.roles.allow({
  insert: function (userId, posts) {
    return Roles.userIsInRole(userId, 'admin');
  },
  update: function (userId, posts, fields, modifier) {
    return Roles.userIsInRole(userId, 'admin');
  },
  remove: function (userId, posts) {
    return Roles.userIsInRole(userId, 'admin');
  }
});
