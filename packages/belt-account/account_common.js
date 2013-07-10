//
// Account
//

//
// Methods
//
// Access Control -- verify that the user is modifying their profile
// or the modification is being made by an admin.
var ownerOrAdmin = function (reqId, ownerId) {
  // Access Control -- verify that the user is modifying their profile
  // or the modification is being made by an admin.
  if ((ownerId === reqId) || Roles.userIsInRole(reqId, 'admin'))
    return true;
  throw new Meteor.Error(401, 'Access Denied');
};

// Retrieve the user using the userId, we do this instead of using
// this.user to allow admin updates
var getUserById = function (userId) {
  var user = Meteor.users.findOne(userId);
  if (!user)
    throw new Meteor.Error(403, 'User not found by id');
  return user;
};

Meteor.methods({
  userProfileUpdate: function (userId, profile) {
    profile = profile || {};
    // ACL
    ownerOrAdmin(this.userId, userId);
    // retrieve the user
    var user = getUserById(userId);
    // only update the profile. We don't want users messing with internals
    user.profile = profile;
    return Meteor.users.update(userId, user);
  },
  userEmailVerify: function (userId, emailAddress) {
    // ACL
    ownerOrAdmin(this.userId, userId);
    if (Meteor.isServer) {
      Accounts.sendVerificationEmail(userId, emailAddress);
    }
  },
  userEmailMakeDefault: function (userId, emailAddress) {
    // ACL
    ownerOrAdmin(this.userId, userId);
    // retrieve the user
    var user = getUserById(userId);
    // confirm that the email has been verified
    var invalid = true;
    for (var i = 0; i < user.emails.length; i++) {
      if (user.emails[i].address === emailAddress) {
        if (user.emails[i].verified === true) {
          invalid = false;
        }
      }
    }
    if (invalid) {
      throw new Meteor.Error(
      403, 'The address ' + emailAddress + 'can not be made default.');
    }
    // set the default email
    user.email = emailAddress;
    Meteor.users.update(userId, user);
    return
  },
  userEmailAdd: function (userId, emailAddress) {
    // ACL
    ownerOrAdmin(this.userId, userId);
    // retrieve the user
    var user = getUserById(userId);
    // check if the address was already added
    for (var i = 0; i < user.emails.length; i++) {
      if (user.emails[i].address === emailAddress) {
        throw new Meteor.Error(412, 'Address already added');
      }
    }
    // Add the address
    user.emails.push({
      address: emailAddress,
      verified: false
    });
    Meteor.users.update(userId, user);
    // Send email verification email
    if (Meteor.isServer) {
      Accounts.sendVerificationEmail(userId, emailAddress);
    }
    return
  },
  userEmailDelete: function (userId, emailAddress) {
    // ACL
    ownerOrAdmin(this.userId, userId);
    // retrieve the user
    var user = getUserById(userId);
    if (user.email === emailAddress) {
      throw new Meteor.Error(
      412, 'You can not delete your default email address. Set another email as the default first.');
    }
    if (Meteor.isServer) {
      var oe = user.emails;
      var ne = [];
      // reconstruct the emails list minus the offending email address
      for (var i = 0; i < oe.length; i++) {
        if (oe[i].address !== emailAddress) {
          ne.push(oe[i]);
        }
      };
      user.emails = ne;
    }
    return Meteor.users.update(userId, user);
  }
});
