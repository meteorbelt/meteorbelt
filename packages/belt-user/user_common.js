// User
// ----

Meteor.users.schema({
  createdAt: Date,
  services:  Object,
  emails:    [Object],
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

  // TODO: Maybe there should be a default property on email
  // E.g.
  // {
  //   address: 'test@example.com',
  //   pir: 'test@example.com',
  // }
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
      this.emailHash = Belt.MD5.hex(this.getEmail());
      // save
    }
    return Belt.Gravatar.urlFromHash(this.emailHash, {
      //d: 'http://example.com/img/default_avatar.png',
      s: size
    });
  }

});
