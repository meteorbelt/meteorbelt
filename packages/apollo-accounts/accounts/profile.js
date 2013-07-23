Template.accountProfile.helpers({
  profile: function () {
    return Meteor.user().profile;
  }
});

Template.accountProfile.events({
  'click input[type=submit]': function (e, tmpl) {
    e.preventDefault();

    var f = form2js('profile-form');
    Meteor.user().call('profileUpdate', f, function (err, id) {
      if (err) {
        return Flash.error(err.reason);
      }
      Flash.success('Profile updated successfully');
    });
  }
});
