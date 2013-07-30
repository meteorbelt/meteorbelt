Maps = {};

function init() {
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src = "http://maps.googleapis.com/maps/api/js?sensor=true&callback=googleMapsReady";
  document.body.appendChild(script);
}

var _ready = false;
var _initCalled = false;

function mapsReady() {
  console.log("mapready: ");
  _ready = true;
}

Maps.addressToMap = function (elementId, address) {

  if (! _ready) {
    if (! _initCalled) {
      init();
      _initCalled = true;
    }
    Meteor.setTimeout(function () { addressToMap(elementId, address) }, 100);
    return;
  }

  console.log("notready: ");
  // TODO Geocoding should be cached; possible in the datastore
  var mapOptions = {
    zoom: 10,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  var map = new google.maps.Map(document.getElementById(elementId), mapOptions);
  var geocoder = new google.maps.Geocoder();
  geocoder.geocode({ 'address': address }, function (results, status) {
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
}

this.googleMapsReady = mapsReady;
