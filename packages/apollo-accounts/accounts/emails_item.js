Template.accountEmailsItem.helpers({
  isDefault: function () {
    return Meteor.user().email == this.address ? true : false;
  }
});

Template.accountEmailsItem.events({

  'click .remove': function (e, tmpl) {
    e.preventDefault();

    Meteor.user().call('emailRemove', tmpl.data.address, function (err) {
      if (err) {
        return Flash.error(err.reason);
      }
    });
  },

  'click .verify': function (e, tmpl) {
    e.preventDefault();

    Meteor.user().call('emailSendVerification', tmpl.data.address, function (err) {
      if (err) {
        return Flash.error(err.reason);
      }
      return Flash.info("We have sent a verification email to '" + tmpl.data.address + "' -- please follow the instructions in it.");
    });
  },

  'click .make-default': function (e, tmpl) {
    e.preventDefault();

    Meteor.user().call('emailMakeDefault', tmpl.data.address, function (err) {
      if (err) {
        return Flash.error(err.reason);
      }
      //return Flash.info(tmpl.data.address + " is now your default email");
    });
  }
});
