Template.accountLogin.helpers({});

Template.accountLogin.events({
  'click input[type=submit]': function (e, tmpl) {
    e.preventDefault();
    var opts = form2js('login');
    Meteor.loginWithPassword(opts.email, opts.password, function (err) {
      if (err) {
        Flash.error(err.reason);
        return;
      }
      // success redirect
      Router.go('accountProfile');
    });
  }
});
