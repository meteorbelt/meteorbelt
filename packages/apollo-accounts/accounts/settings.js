Template.accountSettings.events({
  'click input[type=submit]': function (e, tmpl) {
    e.preventDefault();
    var f = form2js('password-form');
    if (!f.newPassword || f.newPassword.length < 6) {
      Flash.error('Your new password must be at least 6 characters long');
      return;
    }
    Accounts.changePassword(f.currentPassword, f.newPassword, function (err) {
      if (err) {
        return Flash.error(err.reason);
      }
      Flash.success('Password changed successfully');
      document.getElementById('password-form').reset();
    });
  }
});
