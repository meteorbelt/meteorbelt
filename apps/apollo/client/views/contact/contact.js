// TODO move this to a package
// TODO: make reactive
this.contactGoogleMapCallback = function () {
  // TODO Geocoding should be cached; possible in the datastore
  var mapOptions = {
    zoom: 10,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  var map = new google.maps.Map(document.getElementById("contact-map"), mapOptions);
  var geocoder = new google.maps.Geocoder();
  var a = Belt.settings.public.contact.address;
  var addr = a.address1 + ' ' + a.address2 + ' ' + a.city + ', ' + a.state + ' ' + a.zip;
  geocoder.geocode({ 'address': addr}, function (results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      map.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
        map: map,
        draggable: false,
        animation: google.maps.Animation.DROP,
        position: results[0].geometry.location
      });
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
};

var contactLoadMap = function () {
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src = "http://maps.googleapis.com/maps/api/js?sensor=true&callback=contactGoogleMapCallback";
  document.body.appendChild(script);
};

Template.contact.created = function () {
  // TODO: we should only load the map if it hasn't been load.
  // The problem is that the callback
  contactLoadMap();
};

Template.contact.preserve(["#contact-map"]);

Template.contact.helpers({
  contact: function () {
    if (Belt.Settings) {
      return Belt.settings && Belt.settings.public && Belt.settings.public.contact || {};
    }
    return {};
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
      Belt.Flash.success('Your message was sent successfully. Thank for your interest. We will be contacting you soon.');
      document.getElementById('contact-form').reset();
    });
  }
});
