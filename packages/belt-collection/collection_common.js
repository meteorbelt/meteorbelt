// Collection
// ----------
// Set validation on the model
_.extend(Belt.Model.prototype, Belt.Validation.mixin);

_.extend(Belt.Model.prototype, {
  save: function (callback) {
    var self = this;
    var err = self.validate();
    console.log('save self: ', self);
    console.log('save err: ', err);
    if (err) {
      // send a validation error to the callback
      //throw new Meteor.error(401, err);
      var e = {
        error: 401,
        message: err
      };
      callback(e, null);
      return null;
    }
    console.log('save object: ', self.toObject());
    console.log('self._Collection: ', self._Collection);
    if (self._id) {
      var o = self.toObject();
      return self._Collection.update({_id: o._id}, {$set: o}, callback);
    }
    return self._Collection.insert(self.toObject(), callback);
  }
});

var Collection = Meteor.Collection;

Collection._methods = {};
Collection._statics = {};
Collection.schema = {};

// Methods
// -------
Collection.extend = Belt.Helpers.extend;

// Prototype
// ---------
_.extend(Collection.prototype, {
  model: Belt.Model,
  // create a new model
  create: function (doc) {
    var self = this;
    var m = new self.model(doc);
    m._Collection = self;
    m.validation = self.schema;
    _.extend(m, self._methods);
    return m;
  },
  // model methods
  methods: function (methodMap) {
    var self = this;
    var methods = (self._methods = (self._methods || {}));
    for (var h in methodMap) {
      methods[h] = methodMap[h];
    }
  },
  // collection methods
  statics: function (obj) {
    _.extend(this._statics, obj);
  },

  // pre defines functions that should be run prior to operational calls
  // obj:
  //   {
  //     insert: function (userId, doc) {},
  //     update: function (userId, doc) {},
  //     delete: function (userId, doc) {},
  //   }
  before: function (obj) {

  },
  after: function (obj) {

  }
});

// Exports
// -------
Belt.Collection = Collection
// XXX Janky we probably shouldn't be overriding in this manner
// Belt.Collection = (function () {
//   var original_a = Meteor.Collection;
//
//   if (condition) {
//     return function () {
//       new_code();
//       original_a();
//     }
//   } else {
//     return function () {
//       original_a();
//       other_new_code();
//     }
//   }
// })();
