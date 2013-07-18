// User
// ----
// @export User
User = {};

Meteor.users.schema({
  createdAt: Date,
  username:  String,
  services:  Object,
  emails:    [Object],
  roles:     [String],
  // XXX restrict
  profile:   Object
});

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
    if (this.getEmail()) {
      return this.getEmail();
    }
    return 'Anonymous User';
  },

  getEmail: function () {
    if (this.emails && this.emails.length) {
      return this.emails[0].address.trim().toLowerCase();
    }
    return '';
  },

  avatarUrl: function (size) {
    // default value set to 50px
    size = size || 50;
    //if (this.signupMethod(user) === 'twitter') {
    //return 'https://api.twitter.com/1/users/profile_image?screen_name=' + user.services.twitter.screenName;
    //}
    if (!this.emailHash) {
      this.emailHash = MD5.hex(this.getEmail());
      // save
    }
    return Gravatar.urlFromHash(this.emailHash, {
      //d: 'http://example.com/img/default_avatar.png',
      s: size
    });
  }

});

// Email methods
Meteor.users.methods({

  sendVerificationEmail: function (emailAddress) {
    if (Meteor.isServer) {
      Accounts.sendVerificationEmail(this._id, emailAddress);
    }
  },

  emailMakeDefault: function (emailAddress, fn) {
    var self = this;

    // Make sure that email address has been added and varified
    var found = _.find(self.user.emails, function (e) {
      return e.address === emailAddress;
    });

    if (! found) {
      return fn('The address ' + emailAddress + 'can not be made default.');
    }

    // set the default email
    self.email = emailAddress;
    return self.update(fn);
  },

  addEmail: function (emailAddress, fn) {
    var self = this;

    var found = _.find(self.user.emails, function (e) {
      return e.address === emailAddress;
    });

    if (! found) {
      return fn(emailAddress + ' has already been added to your account.');
    }

    // Send email verification email
    if (Meteor.isServer) {
      Accounts.sendVerificationEmail(self._id, emailAddress);
    }

    // Add the email
    self.emails.push({
      address: emailAddress,
      verified: false
    });

    return self.update(fn);
  },

  removeEmail: function (emailAddress, fn) {
    var self = this;

    if (user.email === emailAddress) {
      return fn('You can not delete your default email address. ' +
                'Set another email as the default first.');
    }

    self.emails = _.reject(self.emails, function (e) {
      e.address === emailAddress;
    });

    return this.update(fn);
  }
});


