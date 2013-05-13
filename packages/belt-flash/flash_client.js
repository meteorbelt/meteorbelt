// flash provides an api for temporary flash messages stored in a
// client only collection

var flash = {};

// Client only collection
flash.Collection = new Meteor.Collection(null);

// create given a message and optional type creates a flash message.
flash.create = function (message, type) {
  type = (typeof type === 'undefined') ? 'error' : type;
  // Store errors in the 'Errors' local collection
  flash.Collection.insert({
    message: message,
    type: type,
    seen: false,
    show: true
  });
};

// error is a helper function for creating error messages
flash.error = function (message) {
  return flash.create(message, 'error');
};

// success is a helper function for creating success messages
flash.success = function (message) {
  return flash.create(message, 'success');
};

// info is a helper function for creating info messages
flash.info = function (message) {
  return flash.create(message, 'info');
};

// clear hides viewed message
flash.clear = function () {
  flash.Collection.update({
    seen: true
  }, {
    $set: {
      show: false
    }
  }, {
    multi: true
  });
};

Belt.Flash = flash;
