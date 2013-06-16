// Collection
// ----------
var Model = function (doc) {
  // this._Collection = collection;
  _.extend(this, doc);
};

// Set validation on the model
// _.extend(Belt.Model.prototype, Belt.Validation.mixin);

_.extend(Model.prototype, {
  save: function (callback) {
    var self = this;
    var err = self.validate();
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
    if (self._id) {
      var o = self.toObject();
      return self._Collection.update({_id: o._id}, {$set: o}, callback);
    }
    return self._Collection.insert(self.toObject(), callback);
  }
});

// Exports
// -------
Belt.Collection = (function () {

  // var _Collection = null;

  // This function will ultimately be the "constructor" for your object
  function Collection(/** arguments **/) {

    var collection = new Meteor.Collection(arguments);
    // Statics
    // -------
    collection._methods = {};
    collection._statics = {};
    collection._schema = {};
    this._Collection = collection;
  }

  // Methods
  // -------
  _.extend(Collection.prototype, {

    // Model: Model,

    extend: function (doc) {
      return Object.create(this);
    },

    create: function (doc) {
      var m = Object.create(doc);
      _.extend(m, this._methods);
      m._Collection = this;
      return m;
    },

    pluggin: function (fn, opts) {
      return fn(this, opts);
    },

    // collection methods
    statics: function (obj) {
      // _.extend(this._statics, obj);
    },

    schema: function (obj) {
      // _.extend(this._schema, obj);
    },

    // model methods
    methods: function (methodMap) {
      var methods = (this._methods = (this._methods || {}));
      for (var h in methodMap) {
        methods[h] = methodMap[h];
      }
      this._methods = methods;
      console.log("this._methods: ", this._methods);
    },

    allow: function (doc) {
    },

    deny: function (doc) {
    },

    validate: function (path, fn, errorMsg) {
      if (fn(this[path])) {
        return;
      }
      return errorMsg;
    },

    // pre defines functions that should be run prior to operational calls
    // obj:
    //   {
    //     insert: function (userId, doc) {},
    //     update: function (userId, doc) {},
    //     delete: function (userId, doc) {},
    //   }
    before: function (obj) {
      return obj;
    },

    after: function (obj) {
      return obj;
    }
  });

  return Collection;
})();
