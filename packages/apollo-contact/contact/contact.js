
function addressToString(a) {
  return a.address1 + ' ' + a.address2 + ' ' + a.city + ', ' + a.state + ' ' + a.zip;
}

Template.contact.created = function () {
  var contact = Belt.Settings.get('contact');
  if (contact && contact.showAddress) {
    var addr = addressToString(contact.address);
    // Belt.Maps.addressToMap('contact-map', addr);
  }
};

Template.contact.rendered = function () {
  $(document).foundation('section');
};

Template.contact.preserve(["#contact-map"]);

Template.contact.helpers({
  contact: function () {
    return Belt.Settings.get('contact');
  },
  mapUrl: function () {
    var url;
    var c =  Belt.Settings.get('contact');
    if (c && c.address) {
      var addr = addressToString(c.address);
      url = "http://maps.googleapis.com/maps/api/staticmap?center=" + addr + "&zoom=13&size=200x200&sensor=false"
    }
    return url;
  }
});

Template.contact.events({
  'click input[type="submit"]': function (e, tmpl) {
    //Clear all flash messages
    Flash.clear();
    e.preventDefault();
    var f = form2js('contact-form');
    Meteor.call('contactSendEmail', f.email, f.name, f.phone, f.message, function (err) {
      if (err) {
        Flash.error(err.reason);
        return;
      }
      Flash.success('Your message was sent successfully. ' +
        'Thank for your interest. We will be contacting you soon.');
      document.getElementById('contact-form').reset();
    });
  }
});
