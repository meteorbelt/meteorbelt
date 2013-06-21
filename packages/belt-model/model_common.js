// Collection
// ----------

var BaseModel = {

  // added by creator
  /**
   * a reference to the parent collection
   * @type {Belt.Model}
   */
  _collection: null,

  /**
   * strips unnecessary properties and methods
   * @return {Object}
   */
  toObject: function () {
    // remove some properties
    var remove = ['_collection'];
    var doc = _.omit(this, remove);
    // remove all functions
    // _.each(doc, function (v, k) {
    //   if(typeof v === 'function') {
    //     delete doc[k];
    //   }
    // });
    return doc;
  },

  /**
   * validate the model against the schema
   * @return {Object} the error Object is a one to one mapping of the doc
   *         E.g.
   *           doc:
   *           {
   *             str: true, // should be of type String
   *             num: 42    // no error
   *           }
   *           result:
   *           {
   *             str: 'should be String'
   *           }
   * 
   *         num is omitted because there was no error.
   */
  validate: function () {
    return Belt.Schema.validate(this._collection._schema, this.toObject());
  },

  save: function (fn) {
    var self = this;
    var err = self.validate();
    if (err) {
      // send a validation error to the callback
      //throw new meteor.error(401, err);
      var e = {
        error: 401,
        reason: "Validation Error",
        details: err
      };
      fn(e, null);
      return null;
    }
    var o = self.toObject();
    // var o = self;
    if (self._id) {
      return self._collection.update({_id: o._id}, {$set: o}, fn);
    }
    return self._collection.insert(o, fn);
  }

};

var Model = {

  /**
   * _collection is the associated `Meteor.Collection` instance
   * @type {Meteor.Collection}
   */

  _processors: {
    find:    { before: [], after: [] },
    findOne: { before: [], after: [] },
    insert:  { before: [], after: [] },
    update:  { before: [], after: [] },
    remove:  { before: [], after: [] }
  },

  _collection: null,

  _baseModel: BaseModel,

  _methods: {},
  _schema: {},

  extend: function (name, attrs) {

    var self = this;
    var obj = Object.create(self);

    // set default values
    obj._collection = null;
    obj._baseModel = BaseModel;
    obj._schema = {};
    obj._collection = new Meteor.Collection(name);

    // added attributes from passed in object
    if (attrs instanceof Object) {
      var safeMethods = ["schema", "methods", "statics"];
      _.each(_.pick(attrs, safeMethods), function (val, key) {
        obj[key](val);
      });
    }

    // add Meteor.Collection methods
    var sharedMethods = [
      "find",
      "findOne",
      "insert",
      "update",
      "remove",
      "allow",
      "deny",
      "before",
      "after"
    ];
    _.each(sharedMethods, function (method) {
      obj[method] = function (/* arguments */) {
        obj._collection[method].apply(obj._collection, arguments);
      };
    });
    return obj;
  },

  create: function (doc) {
    // Populate the doc. This will fill in missing values with defaults
    // and convert things to their proper types.
    doc = Belt.Schema.populate(this._schema, doc || {});
    var m = Object.create(doc);
    _.extend(m, this._baseModel, this._methods);
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
  methods: function (obj) {
    _.extend(this._baseModel, obj);
  }

};

// Exports
// -------
Belt.Model = Model;
