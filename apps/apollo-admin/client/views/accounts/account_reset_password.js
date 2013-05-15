Template.accountResetPassword.rendered = function () {
  this.find('input[name="email"]').focus();
};

Template.accountResetPassword.events({
  'click input[type=submit]': function (e, tmpl) {
    e.preventDefault();
    var email = tmpl.find('input[name="email"]').value;
    Meteor.call('userResetPassword', email, function (err) {
      if (err) {
        Belt.Flash.error(err.reason);
        return;
      }
      Belt.Flash.success('We have sent an email to  ' + email + ' -- please follow the direction in it.');
      email = '';
    });
  }
});
