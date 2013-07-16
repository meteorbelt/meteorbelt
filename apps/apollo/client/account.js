// XXX these are hacks to work around Meteors embedded callback URLs
//
// populate the session so that the appropriate dialogs are
// displayed by reading variables set by accounts-urls, which parses
// special URLs. since accounts-ui depends on accounts-urls, we are
// guaranteed to have these set at this point.
//
if (Accounts._resetPasswordToken) {
  Session.set('accountResetPasswordToken', Accounts._resetPasswordToken);
  Accounts._resetPasswordToken = '';
  Meteor.defer(function () {
    Meteor.Router.to('/account/reset-password/complete');
  });
}

if (Accounts._enrollAccountToken) {
  Session.set('accountEnrollToken', Accounts._enrollAccountToken);
  Accounts._enrollAccountToken = '';
}

// Needs to be in Meteor.startup because of a package loading order
// issue. We can't be sure that accounts-password is loaded earlier
// than accounts-ui so Accounts.verifyEmail might not be defined.
Meteor.startup(function () {
  if (Accounts._verifyEmailToken) {
    Accounts.verifyEmail(Accounts._verifyEmailToken, function (err) {
      Accounts._enableAutoLogin();
      if (err) {
        Flash.error('An Error occured while attempting to verifiy your Email address. Please try again.');
        return;
      }
      Accounts._resetPasswordToken = '';
      Meteor.defer(function () {
        Meteor.Router.to('/account/emails');
        Flash.success('Email address successfully verified.');
      });
    });
  }
});
