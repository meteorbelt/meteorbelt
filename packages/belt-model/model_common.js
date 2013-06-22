/**
 * This file incorporates code from 
 * https://github.com/matb33/meteor-collection-hooks
 *
 * (c) 2013 Mathieu Bouchard
 */

// Collection
// ----------

function getUserId() {
  var currentInvocation;

  try {
    currentInvocation = Meteor._CurrentInvocation.get();
  } catch (e) {}

  if (currentInvocation) {
    return currentInvocation.userId;
  } else {
    // this.userId will likely not be defined because no one usually
    // invokes collection.insert with a `.call(this)`... But if they
    // do, userId will be available to the end-callback.
    return this.userId || null;
  }
}

var delegate = function ( /* arguments */ ) {
  var self = this;
  var args = Array.prototype.slice.call(arguments);
  var type = args.shift();
  var method = args.shift();
  _.each(self._processors[method][type], function (fn) {
    // The function call in an if statement to ensure that it is processed synchronously.
    // XXX we're setting `this` in the fn to self, because we have to set it to
    // something, but it should not be relayed upon. Maybe it would be better to set
    // `this` to the doc?
    if (fn.apply(self, args)) {
      return false;
    }
  });
};

var BaseModel = function (doc) {
  _.extend(this, doc);
};

_.extend(BaseModel.prototype, {

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
   *           error.details:
   *           {
   *             str: 'should be String'
   *           }
   * 
   *         num is omitted because there was no error.
   */
  validate: function () {
    var err = this._collection.validate(this.toObject());
    if (err) { return err.details; }
    return null;
  },

  populate: function (doc) {
    doc = Belt.Schema.populate(this._collection._schema, doc || {});
    _.extend(this, doc);
  },

  save: function (fn) {
    // var self = this;
    // var err = self.validate();
    // if (err) {
    //   if (typeof fn === 'function') {
    //     fn(err, null);
    //     return null;
    //   } else {
    //     throw new Error('Validation Error');
    //   }
    // }
    // var o = self.toObject();
    return this._collection.save(this.toObject(), fn);
  }
});

var Model = function (name, attrs) {
  var self = this;

  // set default values
  self._mc = null;
  self._baseModel = BaseModel;
  self._schema = {};
  self._methods = {};
  self._processors = {
    find:    { before: [], after: [] },
    findOne: { before: [], after: [] },
    insert:  { before: [], after: [] },
    update:  { before: [], after: [] },
    save:    { before: [], after: [] },
    remove:  { before: [], after: [] }
  };

  self._mc = new Meteor.Collection(name, {
    transform: function (doc) {
      return self.create(doc);
    }
  });

  // added attributes from passed in object
  if (attrs instanceof Object) {
    var safeMethods = ["schema", "methods", "statics", "before", "after"];
    _.each(_.pick(attrs, safeMethods), function (val, key) {
      self[key](val);
    });
  }

  // add Meteor.Collection methods
  var sharedMethods = [
    "find",
    "findOne",
    // "insert",
    // "update",
    "remove",
    "allow",
    "deny"
  ];
  _.each(sharedMethods, function (method) {
    self[method] = function (/* arguments */) {
      return self._mc[method].apply(self._mc, arguments);
    };
  });
};

_.extend(Model.prototype, {
  // Private DONT USE these they may change without warning.

  /**
   * _collection is the associated `Meteor.Collection` instance
   * @type {Meteor.Collection}
   */
  _mc: null,

  BaseModel: BaseModel,

  _methods: {},
  _schema: {},


  // Public
  // ------
  validate: function (doc) {
    var err = Belt.Schema.validate(this._schema, doc);
    if (err) {
      return {
        error: 401,
        reason: "Validation Error",
        details: err
      };
    }
    return null;
  },

  create: function (doc) {
    // Populate the doc. This will fill in missing values with defaults
    // and convert things to their proper types.
    doc = Belt.Schema.populate(this._schema, doc || {});
    var m = new BaseModel(doc);
    _.extend(m, this.BaseModel, this._methods);
    m._collection = this;
    return m;
  },

  insert: function () {
    var self = this;
    var args = arguments;
    var doc = args[0];
    var cb = args[1];
    // process before functions.
    if (delegate.call(self, 'before', 'insert', doc, cb) !== false) {
      // We put this in an if statement to ensure that preprocessors are run synchronously
      var err = self.validate(doc);
      if (err) {
        cb(err, null);
        return null;
      }
      var id = self._mc.insert.apply(self._mc, arguments);
      // process after functions
      delegate.call(self, 'after', 'insert', id && self.findOne({_id: id}) || doc, cb);
    }
    return id;
  },

  update: function (selector, modifier, options, callback) {
    var result, previous, i, len, stopFiltering;
    var updateArgumentsRaw = Array.prototype.slice.call(arguments).reverse();
    var updateArguments = [];
    var userId = getUserId.call(this);

    if (delegate.call(this, "before", "update", userId, selector, modifier, options, callback) !== false) {
      previous = this._collection.find(selector, {reactive: false}).fetch();

      // Build an array of the parameters in preparation for Function.apply.
      // We can't use call here because of the way Meteor.Collection.update
      // resolves if the last parameter is a callback or not. If we use call,
      // and the caller didn't pass options, callbacks won't work. We need
      // to trim any undefined arguments off the end of the arguments array
      // that we pass.
      stopFiltering = false;
      for (i = 0, len = updateArgumentsRaw.length; i < len; i++) {
        // Skip undefined values until we hit a non-undefined value.
        // Then accept everything.
        if (stopFiltering || updateArgumentsRaw[i] !== undefined) {
          updateArguments.push(updateArgumentsRaw[i]);
          stopFiltering = true;
        }
      }

      updateArguments = updateArguments.reverse();

      result = directUpdate.apply(this, updateArguments);
      delegate.call(this, "after", "update", userId, selector, modifier, options, previous, callback);
    }

    return result;
  },

  remove: function (selector, callback) {
    var result, previous, userId = getUserId.call(this);

    if (delegate.call(this, "before", "remove", userId, selector, callback) !== false) {
      previous = this._collection.find(selector, {reactive: false}).fetch();
      result = directRemove.call(this, selector, callback);
      delegate.call(this, "after", "remove", userId, selector, previous, callback);
    }

    return result;
  },

  save: function (doc, cb) {
    var self = this;
    var id;
    // process before functions
    if (delegate.call(self, 'before', 'save', doc, cb) !== false) {
      if (! doc._id) {
        id = this.insert(doc, cb);
        // process after functions
      }
      // Update
      else {
        // Mongo complains if the _id is present on set;
        id = doc._id;
        delete doc._id;
        // TODO maybe we can be smarter about the $set. Only setting changed values
        id = this.update({_id: id}, {$set: doc}, cb);
      }
      delegate.call(self, 'after', 'save', id && self.findOne({_id: id}) || doc, cb);
    }
    return id;
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
    _.extend(this.BaseModel, obj);
  }
});

if (Meteor.isServer) {
  var _validatedInsert = Meteor.Collection.prototype._validatedInsert;
  var _validatedUpdate = Meteor.Collection.prototype._validatedUpdate;
  var _validatedRemove = Meteor.Collection.prototype._validatedRemove;

  // These are triggered on the server, but only when a client initiates
  // the method call. They act similarly to observes, but simply hi-jack
  // _validatedInsert. Additionally, they hi-jack the collection
  // instance's _collection.insert/update/remove temporarily in order to
  // maintain validator integrity (allow/deny).

  Meteor.Collection.prototype._validatedInsert = function (userId, doc) {
    var result, id;
    var self = this;

    var _insert = self._collection.insert;
    self._collection.insert = function (doc) {
      // if (delegate.call(self, "before", "insert", userId, doc) !== false) {
      //   id = _insert.call(this, doc);
      //   delegate.call(self, "after", "insert", userId, id && this.findOne({_id: id}) || doc);
      // }
    };
    _validatedInsert.call(self, userId, doc);
    self._collection.insert = _insert;
  };

  // Meteor.Collection.prototype._validatedUpdate = function (userId, selector, mutator, options) {
  //   var result, previous;
  //   var self = this;

  //   var _update = self._collection.update;
  //   self._collection.update = function (selector, mutator, options) {
  //     if (delegate.call(self, "before", "update", userId, selector, mutator, options) !== false) {
  //       previous = this.find(selector).fetch();
  //       _update.call(this, selector, mutator, options);
  //       delegate.call(self, "after", "update", userId, selector, mutator, options, previous);
  //     }
  //   };
  //   _validatedUpdate.call(self, userId, selector, mutator, options);
  //   self._collection.update = _update;
  // };

  // Meteor.Collection.prototype._validatedRemove = function (userId, selector) {
  //   var result, previous;
  //   var self = this;

  //   var _remove = self._collection.remove;
  //   self._collection.remove = function (selector) {
  //     if (delegate.call(self, "before", "remove", userId, selector, previous) !== false) {
  //       previous = this.find(selector).fetch();
  //       _remove.call(this, selector);
  //       delegate.call(self, "after", "remove", userId, selector, previous);
  //     }
  //   };
  //   _validatedRemove.call(self, userId, selector);
  //   self._collection.remove = _remove;
  // };
}

_.each(['before', 'after'], function (process) {
  Model.prototype[process] = function (obj) {
    var self = this;
    _.each(obj, function (cb, method) {
      if (typeof cb !== 'function') {
        throw new Error('Expected ' + process + ' ' + method + 
          ' to be of type Function; not of type ' + (typeof cb));
      }
      self._processors[method].before.push(cb);
    });
  };
});

// Exports
// -------
Belt.Model = Model;
