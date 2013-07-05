
Template.contact.created = function () {
  var contact = Belt.Settings.get('contact');
  if (contact && contact.showAddress) {
    // contactLoadMap();
    // Belt.Maps.load('')
    var a = contact.address;
    var addr = a.address1 + ' ' + a.address2 + ' ' + a.city + ', ' + a.state + ' ' + a.zip;
    Belt.Maps.addressToMap('contact-map', addr);
  }
};

Template.contact.preserve(["#contact-map"]);

Template.contact.helpers({
  contact: function () {
    return Belt.Settings.get('contact');
  }
});

Template.contact.events({
  'click input[type="submit"]': function (e, tmpl) {
    //Clear all flash messages
    Belt.Flash.clear();
    e.preventDefault();
    var f = form2js('contact-form');
    Meteor.call('contactSendEmail', f.email, f.name, f.phone, f.comment, function (err) {
      if (err) {
        Belt.Flash.error(err.reason);
        return;
      }
      Belt.Flash.success('Your message was sent successfully. ' +
        'Thank for your interest. We will be contacting you soon.');
      document.getElementById('contact-form').reset();
    });
  }
});
