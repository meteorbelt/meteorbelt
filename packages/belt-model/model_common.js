// Collection
// ----------

var Model = {

  /**
   * _collection is the associated `Meteor.Collection` instance
   * @type {Meteor.Collection}
   */

  _collection: null,

  _methods: {},
  _schema: {},

  // Model: Model,

  extend: function (name, attrs) {
    var obj = Object.create(this);
    obj._collection = new Meteor.Collection(name);
    // Add the attributes:
    // - schema
    // - methods
    // - statics
    // - before
    // - after
    // if presents
    if (attrs instanceof Object) {
      var safeMethods = ["schema", "methods", "statics", "before", "after"];
      _.each(_.pick(attrs, safeMethods), function (val, key) {
        obj[key](val);
      });
    };
    return obj;
  },

  create: function (doc) {
    var m = Object.create(doc);
    _.extend(m, this._methods);
    m._collection = this;
    return m;
  },

  pluggin: function (fn, opts) {
    return fn(this, opts);
  },

  // collection methods
  statics: function (obj) {
    _.extend(this, obj);
  },

  schema: function (obj) {
    _.extend(this._schema, obj);
  },

  // model methods
  methods: function (methodMap) {
    var methods = (this._methods = (this._methods || {}));
    for (var h in methodMap) {
      methods[h] = methodMap[h];
    }
    this._methods = methods;
  },

  allow: function (obj) {
    this._collection.allow(obj);
  },

  deny: function (obj) {
    this._collection.deny(obj);
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
};

// Exports
// -------
Belt.Model = Model;
