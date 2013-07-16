// Flash provides an api for temporary Flash messages stored in a
// client only collection

// @export Flash
Flash = {};

// Client only collection
Flash.Collection = new Meteor.Collection(null);

// create given a message and optional type creates a Flash message.
Flash.create = function (message, type) {
  type = (typeof type === 'undefined') ? 'error' : type;
  // Store errors in the 'Errors' local collection
  Flash.Collection.insert({
    message: message,
    type: type,
    seen: false,
    show: true
  });
};

// error is a helper function for creating error messages
Flash.error = function (message) {
  return Flash.create(message, 'error');
};

// success is a helper function for creating success messages
Flash.success = function (message) {
  return Flash.create(message, 'success');
};

// info is a helper function for creating info messages
Flash.info = function (message) {
  return Flash.create(message, 'info');
};

// clear hides viewed message
Flash.clear = function () {
  // XXX I have no idea why this is necessary
  // the router will relaod the page twice without this.
  f = Flash.Collection.find({}, { reactive: false }).fetch();
  if (f && f.length) {
    Flash.Collection.update({
      seen: true
    }, {
      $set: {
        show: false
      }
    }, {
      multi: true
    });
  }
  return;
};
