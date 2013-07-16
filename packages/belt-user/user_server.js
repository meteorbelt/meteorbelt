//
// Publish
//

// Users should have access to their own data
Meteor.publish('currentUser', function () {
  return Meteor.users.find(this.userId);
});

Meteor.publish('allUsers', function () {
  // if user is an admin, publish all fields
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Meteor.users.find();
  }
  // else, filter out sensitive info
  return Meteor.users.find({}, {
    fields: {
      secret_id: false,
      roles: false,
      emails: false,
      notifications: false,
      'profile.email': false,
      'services.twitter.accessToken': false,
      'services.twitter.accessTokenSecret': false,
      'services.twitter.id': false,
      'services.password': false
    }
  });
});

//
// Accounts
//
User.onCreate = function (opts, user) {
  user.profile = opts.profile || {};
  if (opts.email) {
    // hash the email address for use with Gravatar
    opts.email = opts.email.trim().toLowerCase();
    user.emailHash = MD5.hex(opts.email);
  }
  if (!user.profile.name) {
    // if no name user the user's username
    user.profile.name = user.username;
  }
  // if this is the first user ever, make them an admin
  if (!Meteor.users.find().count()) {
    Roles.addUsersToRoles(user._id, ['admin']);
    // TODO: the user hasn't been created yet so the above will create the role,
    // but it won't added it to the user object.
    user.roles = ['admin'];
  }
  // add the email information to the profile so the user
  // can view / edit it.
  user.email = opts.email;
  user.profile.name = opts.name;
  Meteor._debug('\nonCreateUser opts: ', opts);
  Meteor._debug('\nonCreateUser user: ', user);
  return user;
};

//
// Methods
//
Meteor.methods({
  userAddUsersToRoles: function (userIds, roles) {
    return Roles.addUsersToRoles(userIds, roles);
  },
  userRemoveUsersFromRoles: function (userIds, roles) {
    return Roles.removeUsersFromRoles(userIds, roles);
  }
});
