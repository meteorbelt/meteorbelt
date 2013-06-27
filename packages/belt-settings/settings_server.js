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
function objectToList(settings, key, isPublic) {
  // XXX check for duplicate key i.e. a key that is used as public
  // and private

  var l = [];

  function checkData(data) {
    if (! _.isObject(data)) {
      console.log("data: ", data);
      // TODO maybe we should just ignore instead of throwing an error.
      throw new Error('settings must be an object with a key');
    }
  }

  _.each(settings, function (data, key) {
    if (key === 'public') {
      _.each(data, function (data, key) {
        checkData(data);
        l.push({ _id: key, public: true, data: data });
      });
    } else {
      checkData(data);
      l.push({ _id: key, public: false, data: data });
    }
  });
 
  return l;
}

// If Meteor.settings.belt add them to the db
// We only store configs that under "belt" key e.g.
// {
//   "belt": {
//     // Yep
//     "something": {
//     }
//   }
//   // Nope
//   "something": {
//   }
// }
if (Meteor.settings && _.isObject(Meteor.settings.belt)) {
  insertMissing(objectToList(Meteor.settings.belt));
}

// Exports
// -------
// For testing
Belt.Settings._objectToList = objectToList;
Belt.Settings._insertMissing = insertMissing;
