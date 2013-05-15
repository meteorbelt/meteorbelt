// XXX It would be useful to store individual settings under their own key
var DB_KEY = 'default';

// Publish
// -------
// a single page, identified by slug
Meteor.publish('settings', function () {
  //return Belt.Settings.find({
    //_id: DB_KEY
  //});
  return Belt.Settings.find();
});

var _get = function () {
  var s = Belt.Settings.findOne({
    _id: DB_KEY
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
      _id: DB_KEY,
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
      _id: DB_KEY
    }, {
      $set: s
    });
  }
};

// If Meteor.settings add them to the db
if (Meteor.settings) {
  var a = _add(Meteor.settings);
}

Belt.settings = _get();

// Exports
// -------
Belt.Settings._add = _add;
Belt.Settings._get = _get;
