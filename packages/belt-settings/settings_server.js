// XXX Storing individual settings under their own key is wildly inefficient

// Publish
// -------
Meteor.publish('settings', function () {
  return Belt.Settings.find({'public': true});
});

function insertMissing(settingsList) {
  try {
    // TODO: should this be async?
    // XXX this is inefficient
    _.each(settingsList, function (v, k) {
      return Belt.Settings.insert(v);
    });
  } catch (err) {
    // TODO ignore duplicate error
    console.log('err', err.stack);
  }
}

// objectToList takes a settings object and returns a collection of object
// suitable for storage.
function objectToList(settings) {
  // TODO check for duplicate key i.e. a key that is used as public
  // and private
  // TODO handle duplicate keys i.e. both in public and private
  // if we don't have belt configs return
  if (!_.isObject(settings.belt)) {
    return;
  }
  settings = settings.belt;
  var l = [];
  _.each(settings, function (val, key) {
    if (key === 'public') {
      _.each(val, function (v, k) {
        if (!_.isObject(v)) {
          // TODO maybe we should just ignore instead of throwing an error.
          throw new Error('settings must be an object with a key');
        }
        var s = { public: true, _id: k };
        _.extend(s, v);
        l.push(s);
      });
      return;
    }
    if (!_.isObject(val)) {
      // TODO maybe we should just ignore instead of throwing an error.
      throw new Error('settings must be an object with a key');
    }
    var s = { public: false, _id: key };
    _.extend(s, val);
    l.push(s);
  });
  return l;
}

// If Meteor.settings add them to the db
if (Meteor.settings) {
  insertMissing(objectToList(Meteor.settings));
}

// Exports
// -------
// For testing
Belt.Settings._objectToList = objectToList;
Belt.Settings._insertMissing = insertMissing;
