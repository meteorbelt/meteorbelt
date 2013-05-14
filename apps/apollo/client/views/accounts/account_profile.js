Template.accountProfile.helpers({
  profile: function () {
    return Meteor.user().profile;
  }
});

Template.accountProfile.events({
  'click input[type=submit]': function (e, tmpl) {
    e.preventDefault();
    var f = form2js('profile-form');
    Meteor.call('userProfileUpdate', Meteor.userId(), f, function (err, id) {
      if (err) {
        return Belt.Flash.error(err.reason);
      }
      Belt.Flash.success('Profile updated successfully');
    });
  }
});
