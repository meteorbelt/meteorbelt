Template.accountSignup.helpers({});

Template.accountSignup.events({
  'click input[type=submit]': function (e, tmpl) {
    e.preventDefault();
    var opts = form2js('signup');
    if (!opts.password || opts.password.length < 5) {
      return Flash.error('You password must be atleast 6 characters');
    }
    Accounts.createUser(opts, function (err) {
      Meteor._debug('signup err: ', err);
      if (err) {
        Flash.error(err.reason);
        return;
      }
      // success redirect
      Router.go('accountProfile');
    });
  }
});
