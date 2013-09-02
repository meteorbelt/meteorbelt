Template.accountEmails.helpers({
  allEmails: function () {
    return Meteor.user().emails;
  }
});

Template.accountEmails.events({
  'click input[type=submit]': function (e, tmpl) {
    e.preventDefault();
    
    var address = tmpl.find('input[name="address"]').value;
    Meteor.user().call('emailAdd', address, function (err) {
      if (err) {
        Flash.error(err.reason);
        return;
      }
      Flash.info("We have sent a verification email to '" + address + "' -- please follow the instructions in it.");
      tmpl.find('input[name="address"]').value = '';
    });
  }
});
