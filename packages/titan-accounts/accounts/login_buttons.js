Template.accountLoginButtons.helpers({
  avatarUrl: function () {
    return Meteor.user().avatarUrl(22);
  }
});

Template.accountLoginButtons.events({
  'click .logout': function (e, tmpl) {
    e.preventDefault();

    Meteor.logout(function (err) {
      Meteor._debug('logout err: ', err);
      if (err) {
        Flash.error(err.reason);
        return;
      }
      // success redirect
      Router.go('home');
    });
  }
});
