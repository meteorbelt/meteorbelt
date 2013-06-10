// Model
// -----

var Model = Meteor.Collection;
_collections = {};

var Model = function (attributes, options) {
  var self = this;
  _.extend(self, attributes);
  self.initialize.apply(self, arguments);
};

// Methods
// -------

// Static
// ------
_.extend(Model, {
  create: function (doc) {
    return new this(doc);
  }
});

// Prototype
// ---------
_.extend(Model.prototype, {
  // Initialize is an empty function by default. Override it with your own
  // initialization logic.
  initialize: function () {},
  validate: function () {},
  _toObject: function () {},
  // XXX: maybe there's a better way to do this.
  toObject: function () {
    var o = this._toObject() || this;
    var remove = ['validation', '_Collection', 'constructor', 'save',
      'initialize', 'validate', '_toObject', 'toObject', 'preValidate',
      'isValid'];
    return _.omit(o, remove);
  },
  save: function () {
    var self = this;
    return self._Collection.insert(self.toObject());
  }
});


// Helper function to correctly set up the prototype chain, for subclasses.
// Similar to `goog.inherits`, but uses a hash of prototype properties and
// class properties to be extended.
Model.extend = function (collectionName, protoProps, staticProps) {
  var parent = this;
  var child;
  // The constructor function for the new subclass is either defined by you
  // (the "constructor" property in your `extend` definition), or defaulted
  // by us to simply call the parent's constructor.
  if (protoProps && _.has(protoProps, 'constructor')) {
    child = protoProps.constructor;
  } else {
    child = function () {
      return parent.apply(this, arguments);
    };
  }

  // Add static properties to the constructor function, if supplied.
  _.extend(child, parent, staticProps);

  // Set the prototype chain to inherit from `parent`, without calling
  // `parent`'s constructor function.
  var Surrogate = function () {
    this.constructor = child;
  };
  Surrogate.prototype = parent.prototype;
  child.prototype = new Surrogate();

  // console.log('extend', collectionName, protoProps, staticProps);
  child._Collection = _collections[collectionName] = new Meteor.Collection(collectionName);

  // Add prototype properties (instance properties) to the subclass,
  // if supplied.
  if (protoProps) {
    _.extend(child.prototype, protoProps);
  }

  // Set a convenience property in case the parent's prototype is needed
  // later.
  child.__super__ = parent.prototype;

  return child;
};

var collectionMethods = ["find", "findOne", "insert", "update", "remove",
  "allow", "deny"];

_.each(collectionMethods, function (name) {
  Model[name] = function ( /* arguments */ ) {
    var args = arguments[0];
    if (name === "allow" || name === "deny") {
      args = args[0];
    }
    if (_.isEmpty(args)) {
      args = {};
    }
    return this._Collection[name](args);

    //return Meteor.call('_beltModel', this._Collection._name, name, args);
  };
});


Meteor.methods({
  '_beltModel': function (collectionName, method, args) {
    // console.log('collectionName', collectionName);
    // console.log('method', method);
    // console.log('args', args);
    return _collections[collectionName][method](args);
  }
});

// Exports
// -------
Belt.Model = Model;
