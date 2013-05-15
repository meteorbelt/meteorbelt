// XXX It would be useful to store individual settings under their own key
var DATASTORE_KEY = 'default';

var _get = function () {
  var s = Belt.Settings.findOne({
    _id: DATASTORE_KEY
  });
  if (s && s.data) {
    return s.data;
  }
  return {};
};

var _add = function (settings) {
  // TODO reverse this. Since updates are more common then inserts we
  // shouldn't waste time performing an insert here.
  var s;
  try {
    s = {
      _id: DATASTORE_KEY,
      data: settings
    };
    // TODO: should this be async?
    return Belt.Settings.insert(s);
  } catch (err) {
    // TODO: should not override existing db records
    // TODO: should this be async?
    s = {
      data: settings
    };
    return Belt.Settings.update({
      _id: DATASTORE_KEY
    }, {
      $set: s
    });
  }
};


// If Meteor.settings add them to the db
if (Meteor.settings) {
  _add(Meteor.settings);
}

Belt.settings = _get();

// Push a subset of settings to the client.
if (Belt.settings && Belt.settings.public) {
  __meteor_runtime_config__.BELT_PUBLIC_SETTINGS = Belt.settings.public;
}

// Exports
// -------
Belt.Settings._add = _add;
Belt.Settings._get = _get;
