// TODO move this to a package
this.contactGoogleMapCallback = function () {
  var latLng = new google.maps.LatLng(37.738955, -96.9316489);
  var mapOptions = {
    zoom: 10,
    center: latLng,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  var map = new google.maps.Map(document.getElementById("contact-map"), mapOptions);
  var marker = new google.maps.Marker({
    map: map,
    draggable: false,
    animation: google.maps.Animation.DROP,
    position: latLng
  });
};

var contactLoadMap = function () {
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src = "http://maps.googleapis.com/maps/api/js?sensor=true&callback=contactGoogleMapCallback";
  document.body.appendChild(script);
};

Template.contact.created = function () {
  //if (typeof (google) === 'undefined') {
    contactLoadMap();
  //}
};

Template.contact.preserve(["#contact-map"]);

Template.contact.helpers({});

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
