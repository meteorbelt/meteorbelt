// Publish
// -------

// Users should have access to their own data
Meteor.publish('currentUser', function () {
  return Meteor.users.find(this.userId);
});

Meteor.publish('users', function (query, options) {

  // if user is an admin, publish all fields
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Meteor.users.find(query, options);
  }
  // else, filter out sensitive info
  // return Meteor.users.find({}, {
  //   fields: {
  //     email:    false,
  //     emails:   false,
  //     profile:  false,
  //     roles:    false,
  //     services: false,
  //   }
  // });
  return;
});

// Accounts
// --------
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

// Methods
// -------

// Access Control -- verify that the user is modifying their profile
// or the modification is being made by an admin.
var ownerOrAdmin = function (reqId, ownerId) {
  // Access Control -- verify that the user is modifying their profile
  // or the modification is being made by an admin.
  if ((ownerId === reqId) || Roles.userIsInRole(reqId, 'admin'))
    return true;
  throw new Meteor.Error(401, 'Access Denied');
};

// Roles
// -----
Meteor.methods({
  userAddUsersToRoles: function (userIds, roles) {
    ownerOrAdmin(this.userId, userId);
    return Roles.addUsersToRoles(userIds, roles);
  },
  userRemoveUsersFromRoles: function (userIds, roles) {
    ownerOrAdmin(this.userId, userId);
    return Roles.removeUsersFromRoles(userIds, roles);
  }
});

// Accounts
// --------
Meteor.methods({
  userResetPassword: function (emailAddress) {
    var u = Meteor.users.findOne({
      'emails.address': emailAddress
    });
    if (!u) {
      // TODO: Should this return nothing instead? Do we want publicize, who
      // has an account with us?
      throw new Meteor.Error(412, 'No account found with that email address');
    }
    Accounts.sendResetPasswordEmail(u._id, emailAddress, function (err) {
      if (err) {
        throw new Meteor.Error(412, 'An error occured: ' + err);
      }
    });
  }
});

