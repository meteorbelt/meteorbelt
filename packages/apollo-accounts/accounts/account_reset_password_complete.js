Template.accountResetPasswordComplete.events({
  'click input[type=submit]': function (e, tmpl) {
    e.preventDefault();
    var t = Session.get('accountResetPasswordToken');
    var np = tmpl.find('input[name="password"]').value;
    if (np.length < 6) {
      Belt.Flash.error('Your new password must be at least 6 characters long');
      return;
    }
    Accounts.resetPassword(t, np, function (err) {
      if (err) {
        Belt.Flash.error('An Error occured while attempting to reset your password. ' + err);
        return;
      }
      Meteor.Router.to('/');
      Belt.Flash.success('Password reset complete. You have been logged in.');
      return;
    });
  }
});
