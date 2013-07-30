// User
// ----
User = {};


// Schema
// ------
Meteor.users.schema({
  // username - optional
  username:  String,

  // email - primary email address
  email:     String,

  // emails - add email address
  // TODO: once Schema adds validation for objects in Arrays
  // emails: [{ address: String, verified: Boolean }],
  emails:    [],
  roles:     [String],

  // profile - user defined fields
  profile:   {
    name:  String,
    phone: String
  },

  // XXX un-restrict
  services:  Object

  // via Plugins
  // createdAt: Date,
  // updatedAt: Date,
});

Meteor.users.plugin(CollectionPlugins.createdAt);
Meteor.users.plugin(CollectionPlugins.updatedAt);


// Methods
// -------
// Add methods to the Meteor.users instances
Meteor.users.methods({
  // # Meteor.users.displayName
  // 
  // 
  displayName: function () {
    if (this.profile && this.profile.name) {
      return this.profile.name;
    }
    if (this.username) {
      return this.username;
    }
    if (this.email) {
      return this.email;
    }
    return 'Anonymous User';
  },

  avatarUrl: function (size) {
    // default value set to 50px
    size = size || 50;
    //if (this.signupMethod(user) === 'twitter') {
    //return 'https://api.twitter.com/1/users/profile_image?screen_name=' + user.services.twitter.screenName;
    //}
    if (!this.emailHash) {
      this.emailHash = MD5.hex(this.email);
      // save
    }
    return Gravatar.urlFromHash(this.emailHash, {
      //d: 'http://example.com/img/default_avatar.png',
      s: size
    });
  }

});

// Profile methods
// TODO: Move to a pluging?
Meteor.users.methods({
  profileUpdate: function (profile, fn) {
    var self = this;
    profile = profile || {};

    self.profile = profile;
    return self.update(fn);
  }
});

// Email methods
// TODO: Move to a pluging?
Meteor.users.methods({

  emailAdd: function (emailAddress, fn) {
    var self = this;

    var found = _.find(self.emails, function (e) {
      return e.address === emailAddress;
    });

    if (found) {
      throw new Meteor.Error(412, 
        emailAddress + ' has already been added to your account.');
    }

    // Add the email
    self.emails.push({
      address: emailAddress,
      verified: false
    });

    return self.update(function (err) {
      if (err && fn)
        return fn(err);

      // No error.
      // Send email verification email
      if (Meteor.isServer)
        // XXX we need to send an email, but the email
        Accounts.sendVerificationEmail(self._id, emailAddress);
      if (fn)
        fn(null);
    });
  },

  emailRemove: function (emailAddress, fn) {
    var self = this;

    if (self.email === emailAddress) {
      throw new Meteor.Error(412, 
        'You can not delete your default email address. ' +
        'Set another email as the default first.');
    }

    self.emails = _.reject(self.emails, function (e) {
      return e.address === emailAddress;
    });

    return self.update(fn);
  },

  emailSendVerification: function (emailAddress) {
    if (Meteor.isServer) {
      Accounts.sendVerificationEmail(this._id, emailAddress);
    }
  },

  emailMakeDefault: function (emailAddress, fn) {
    var self = this;

    // Make sure that email address has been added and varified
    var found = _.find(self.emails, function (e) {
      return e.address === emailAddress;
    });

    if (! found) {
      throw new Meteor.Error(412, 
        'The address ' + emailAddress + 'can not be made default.');
    }

    // set the default email
    self.email = emailAddress;
    return self.update(fn);
  }

});
