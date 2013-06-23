/**
 * This file incorporates code from 
 * https://github.com/matb33/meteor-collection-hooks
 *
 * (c) 2013 Mathieu Bouchard
 */

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


function delegate() {
  var i, len, c;
  var args = _.toArray(arguments);
  var type = args.shift();
  var verb = args.shift();

  if (this._processors && this._processors[type] && this._processors[type][verb]) {
    for (i = 0, len = this._processors[type][verb].length; i < len; i++) {
      c = this._processors[type][verb][i];
      if (typeof c === "function") {
        if (c.apply(this, args) === false) {
          return false;
        }
      }
    }
  }
}

function makeValidationError(err) {
  return {
    error: 401,
    reason: "Validation Error",
    details: err
  };
}

////////////////
// Processors //
////////////////

var directInsert = Meteor.Collection.prototype.insert;
var directUpdate = Meteor.Collection.prototype.update;
var directRemove = Meteor.Collection.prototype.remove;

_.extend(Meteor.Collection.prototype, {

  // These are invoked when the method is called directly on the collection
  // from either the server or client. These are adapted to match the
  // function signature of the triggered version (adding userId)

  insert: function (doc, callback) {
    var self = this;
    var result, userId = getUserId.call(self);

    if (delegate.call(self, "before", "insert", userId, doc, callback) !== false) {
      // Validate against schema
      var err = self.validate(doc);
      if (err) {
        if (typeof callback === 'function') {
          callback(makeValidationError(err), null);
        }
        return null;
      }
      result = directInsert.call(self, doc, callback);
      delegate.call(self, "after", "insert", userId, result && self._collection.findOne({_id: result}) || doc, callback);
    }

    return result;
  },

  update: function (selector, modifier, options, callback) {
    var self = this;
    var result, previous, i, len, stopFiltering;
    var userId = getUserId.call(self);

    if (delegate.call(self, "before", "update", userId, selector, modifier, options, callback) !== false) {
      previous = self._collection.find(selector, {reactive: false}).fetch();
      // Validate against schema
      var err = self.validate(previous[0]);
      if (err) {
        // The callback is optional. Therefore, we must confirm that the last
        // argument is indeed a function.
        var cb = _.last(_.toArray(arguments));
        if (typeof cb === 'function') {
          cb(makeValidationError(err), null);
        }
        return null;
      }
      result = directUpdate.apply(self, arguments);
      delegate.call(self, "after", "update", userId, selector, modifier, options, previous, callback);
    }

    return result;
  },

  remove: function (selector, callback) {
    var self = this;
    var result, previous, userId = getUserId.call(self);

    if (delegate.call(self, "before", "remove", userId, selector, callback) !== false) {
      previous = self._collection.find(selector, {reactive: false}).fetch();
      result = directRemove.call(self, selector, callback);
      delegate.call(self, "after", "remove", userId, selector, previous, callback);
    }

    return result;
  },

  clearHooks: function (verb, type) {
    if (!this._processors) this._processors = {};
    if (!this._processors[type]) this._processors[type] = {};
    this._processors[type][verb] = [];
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
  _.extend(Meteor.Collection.prototype, {
    _validatedInsert: function (userId, doc) {
      var result, id;
      var self = this;

      var _insert = self._collection.insert;
      self._collection.insert = function (doc) {
        if (delegate.call(self, "before", "insert", userId, doc) !== false) {
          // Validate against schema
          var err = self.validate(doc);
          if (err) {
            if (typeof callback === 'function') {
              callback(makeValidationError(err), null);
            }
            return null;
          }
          id = _insert.call(this, doc);
          delegate.call(self, "after", "insert", userId, id && this.findOne({_id: id}) || doc);
        }
      };
      _validatedInsert.call(self, userId, doc);
      self._collection.insert = _insert;
    },

    _validatedUpdate: function (userId, selector, mutator, options) {
      var result, previous;
      var self = this;

      var _update = self._collection.update;
      self._collection.update = function (selector, mutator, options) {
        if (delegate.call(self, "before", "update", userId, selector, mutator, options) !== false) {
          previous = this.find(selector).fetch();
          var err = self.validate(previous[0]);
          if (err) {
            // The callback is optional. Therefore, we must confirm that the last
            // argument is indeed a function.
            var cb = _.last(_.toArray(arguments));
            if (typeof cb === 'function') {
              cb(makeValidationError(err), null);
            }
            return null;
          }
          _update.call(this, selector, mutator, options);
          delegate.call(self, "after", "update", userId, selector, mutator, options, previous);
        }
      };
      _validatedUpdate.call(self, userId, selector, mutator, options);
      self._collection.update = _update;
    },

    _validatedRemove: function (userId, selector) {
      var result, previous;
      var self = this;

      var _remove = self._collection.remove;
      self._collection.remove = function (selector) {
        if (delegate.call(self, "before", "remove", userId, selector, previous) !== false) {
          previous = this.find(selector).fetch();
          _remove.call(this, selector);
          delegate.call(self, "after", "remove", userId, selector, previous);
        }
      };
      _validatedRemove.call(self, userId, selector);
      self._collection.remove = _remove;
    }
  });
}

_.each(["before", "after"], function (type) {
  Meteor.Collection.prototype[type] = function (obj) {
    var self = this;
    _.each(obj, function (cb, verb) {
      if (typeof cb !== 'function') {
        throw new Error('Expected ' + type + ' ' + verb + 
          ' to be of type Function; not of type ' + (typeof cb));
      }
      if (! self._processors) self._processors = {};
      if (! self._processors[type]) self._processors[type] = {};
      if (! self._processors[type][verb]) self._processors[type][verb] = [];

      self._processors[type][verb].push(cb);
    });
  };
});

if (Meteor.isClient) {
  Meteor.Collection.prototype.when = function (condition, callback) {
    var self = this;
    Deps.autorun(function (c) {
      if (condition.call(self._collection)) {
        c.stop();
        callback.call(self._collection);
      }
    });
  };
}

///////////
// Model //
///////////

_.extend(Meteor.Collection.prototype, {

  _BaseModel: Belt.Model,
  // _schema: {},
  // _methods: {},

  pluggin: function (fn, opts) {
    return fn(this, opts);
  },

  // collection methods
  statics: function (obj) {
    _.extend(this, obj);
  },

  schema: function (obj) {
    if (! this._schema) this._schema = {};
    _.extend(this._schema, obj);
  },

  // model methods
  methods: function (obj) {
   if (! this._methods) this._methods = {};
    _.extend(this._methods, obj);
  },

  create: function (doc) {
    var self = this;
    var m = new self._BaseModel(doc, self._schema);
    m._collection = self;
    // add a save convenience method to the model
    m.save = function (cb) {
      return self.save(this.toObject(), cb);
    };
    _.extend(m, self._methods);
    return m;
  },

  validate: function (doc) {
    var self = this;
    // only run validation if a schema is present. This makes validation
    // backwords compatitable.
    if (! self._schema) return null;
    var m = new self._BaseModel(doc, self._schema);
    var err = m.validate();
    if (err) {
      return err;
    }
    return null;
  },

  save: function (doc, cb) {
    var self = this;
    var id;
    // process before functions
    if (delegate.call(self, 'before', 'save', doc, cb) !== false) {
      if (! doc._id) {
        id = this.insert(doc, cb);
      }
      // Update
      else {
        // Mongo complains if the _id is present on the doc when using set.
        // TODO: maybe we can be smarter about the $set. Only setting changed
        // values
        id = doc._id;
        delete doc._id;
        // Make the update callback match the insert callback, 
        // i.e. return the id
        //
        //   callback(err, id)
        //
        // instead of
        //
        //   callback(err)
        //
        id = this.update({_id: id}, {$set: doc}, function (err) {
          return cb(err, id);
        });
      }
      // process after functions
      delegate.call(self, 'after', 'save', id && self.findOne({_id: id}) || doc, cb);
    }
    return id;
  }

});

/////////////////////////////
// Alternative Constructor //
/////////////////////////////

var Collection = function (name, options) {
  var self = this;
  if (options) {
    _.each(['schema', 'methods', 'statics', 'before', 'after'], function (method) {
      var opts = _.pick(options, method);
      delete options[method];
      if (opts && opts[method]) {
        opts = opts[method];
        self[method](opts);
      }
    });
  }

  options = options || {};

  if (typeof options.transform === undefined) {
    options.tranform = function (doc) {
      return new self.create(doc);
    };
  }

  Meteor.Collection.call(this, name, options);
};

Collection.prototype = new Meteor.Collection(null);

Collection.constructor = Collection;

// Exports
// -------
Belt.Collection = Collection;
