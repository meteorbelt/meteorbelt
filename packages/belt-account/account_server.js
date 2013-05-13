//
// Methods
//
Meteor.methods({
  userResetPassword: function (emailAddress) {
    var u = Meteor.users.findOne({
      'emails.address': emailAddress
    });
    if (!u) {
      // TODO: Should this return nothing instead? Do we want publicize, who
      // has an account with us?
      throw new Meteor.Error(412, 'No account found with that email address');
    }
    Accounts.sendResetPasswordEmail(u._id, emailAddress, function (err) {
      if (err) {
        throw new Meteor.Error(412, 'An error occured: ' + err);
      }
    });
  }
});
