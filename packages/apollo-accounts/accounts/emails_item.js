Template.accountEmailsItem.helpers({
  isDefault: function () {
    return Meteor.user().email == this.address ? true : false;
  }
});

Template.accountEmailsItem.events({

  'click .remove': function (e, tmpl) {
    e.preventDefault();
    Meteor.call('userEmailDelete', Meteor.userId(), tmpl.data.address, function (err) {
      if (err) {
        return Flash.error(err.reason);
      }
    });
  },

  'click .verify': function (e, tmpl) {
    e.preventDefault();
    Meteor.call('userEmailVerify', Meteor.userId(), tmpl.data.address, function (err) {
      if (err) {
        return Flash.error(err.reason);
      }
      return Flash.info("We have sent a verification email to '" + tmpl.data.address + "' -- please follow the instructions in it.");
    });
  },

  'click .make-default': function (e, tmpl) {
    e.preventDefault();
    Meteor.call('userEmailMakeDefault', Meteor.userId(), tmpl.data.address, function (err) {
      if (err) {
        return Flash.error(err.reason);
      }
      //return Flash.info(tmpl.data.address + " is now your default email");
    });
  }
});
