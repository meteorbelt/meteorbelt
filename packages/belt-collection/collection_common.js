/**
 * This file includes code influenced by
 * https://github.com/matb33/meteor-collection-hooks
 *
 * (c) 2013 Mathieu Bouchard
 */

function getUserId() {
  var ci;

  try {
    ci = Meteor._CurrentInvocation.get();
  } catch (e) {}

  if (ci) {
    return ci.userId;
  } else {
    // this.userId will likely not be defined because no one usually
    // invokes collection.insert with a `.call(this)`... But if they
    // do, userId will be available to the end-callback.
    return this.userId || null;
  }
}

function makeValidationError(err) {
  return {
    error: 401,
    reason: "Validation Error",
    details: err
  };
}

// Extend Meteor.Collection
// ------------------------

_.extend(Meteor.Collection.prototype, {

  _BaseModel: Model,

  _process: function (type, verb, args) {
    var self = this;

    // Only process the function if the `processors` property is present. 
    // This allows for backwards compatibility.
    if (self._processors && self._processors[verb] && self._processors[verb][type]) {
      _.each(self._processors[verb][type], function (fn) {
        // The function call in an if statement to ensure that it is processed 
        // synchronously.
        //
        // XXX we're setting `this` in the fn to self, because we have to set it
        // to something, but it should not be relayed upon. Maybe it would be 
        // better to set `this` to the doc?
        if (fn.apply(self, args) === false) {
          return false;
        }
      });
    }
  },

  // Override
  _insert: Meteor.Collection.prototype.insert,
  insert: function (doc, fn) {
    var self = this;
    var userId = getUserId.call(self);
    var result;

    // Remove null `_id`s
    // Mongo complains if the `_id` is null.
    if (_.isNull(doc._id)) {
      delete doc._id;
    }
    // call before insert function
    if (self._process("before", "insert", [userId, doc, fn]) !== false) {

      // Validate against schema
      var err = self.validate(doc);
      if (err) {
        if (typeof fn === 'function') {
          fn(makeValidationError(err), null);
        }
        return null;
      }

      // process actual insert
      result = self._insert(doc, fn);

      // call after insert functions
      var args = [
        userId, result && self._collection.findOne({_id: result}) || doc, fn
      ];
      self._process("after", "insert", args);
    }

    return result;
  },

  // override
  _update: Meteor.Collection.prototype.update,
  update: function (selector, modifier, options, fn) {
    var self = this;
    var result;
    var userId = getUserId.call(self);

    // call before update functions
    var args = [userId, selector, modifier, options, fn];
    if (self._process("before", "update", args) !== false) {
      var previous = self._collection.find(selector, { reactive: false }).fetch();
      // var args = _.without(_.toArray(arguments), undefined);
      result = self._update.apply(self, arguments);

      // retrieve the doc for validation
      var doc = self.findOne(selector);

      // Validate against schema
      var err = self.validate(doc);
      var doafter = true;
      if (err) {
        // Set the doc back to it's previous state
        // XXX Danger - the validation should be prior to save this is dangerous.
        _.each(previous, function (doc) {
          var _id = doc._id;
          delete doc._id;
          result = self._update({ _id: _id }, { $set: doc });
        });
        // if the operation is roled back we should not do the after call
        doafter = false;
        // The callback is optional. Therefore, we must confirm that the last
        // argument is indeed a function.
        fn = _.last(_.toArray(arguments));
        if (_.isFunction(fn)) {
          fn(makeValidationError(err), null);
        }
        return null;
      }
      // only call the after functions if the upate was successful
      if (doafter) {
        args = [userId, selector, modifier, options, previous, fn];
        self._process("after", "update", args);
      }
    }

    return result;
  },

  // override
  _remove: Meteor.Collection.prototype.remove,
  remove: function (selector, fn) {
    var self = this;
    var result;
    var userId = getUserId.call(self);

    if (self._process("before", "remove", [userId, selector, fn]) !== false) {
      var previous = self._collection.find(selector, { reactive: false }).fetch();
      result = self._remove(selector, fn);
      var args = [userId, selector, previous, fn];
      self._process("after", "remove", args);
    }

    return result;
  },

  save: function (doc, fn) {
    var self = this;
    var id;
    var userId = getUserId.call(self);

    // process before functions
    if (self._process('before', 'save', [userId, doc, fn]) !== false) {
      // XXX sometime you will want to specify the _id. This is not a good way
      // to determine if the doc as been saved.
      // Maybe we could do a findOne here? Or we have a `dirty` attribute?
      if (! doc._id) {
        // remove null values
        delete doc._id;
        id = this.insert(doc, fn);
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
        this.update({_id: id}, {$set: doc}, function (err) {
          if (! fn) return;
          // Make the error consistent with insert.
          // - The insert callback returns an error or null
          // - The update callback returns an error or undefined
          if (_.isUndefined(err)) {
            err = null;
          }
          return fn(err, id);
        });
      }
      // process after functions
      self._process('after', 'save', [id && self.findOne({_id: id}) || doc, fn]);
    }
    return id;
  },

  plugin: function (fn, opts) {
    var pluginErrMsg = 'Collection.plugin() takes a function with the following ' +
                       'signature:\n  function (collection, options) {};';
    if (_.isUndefined(fn)) {
      throw new Error('The passed in plugin is not valid. Please check the path.\n' +
                      'If you using a CollectionPlugin from another package, be sure' +
                      'to include it in your package.js file.\n' +
                      pluginErrMsg);
    }
    if (typeof fn !== 'function') {
      var t = typeof fn;
      throw new Error(pluginErrMsg + ' Recieved ' + t + ' instead');
    }
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
    var m = new self._BaseModel(doc, self._schema, self);
    m.methods(self._methods);
    return m;
  },

  validate: function (doc) {
    var self = this;
    // only run validation if a schema is present. This makes validation
    // backwards compatible.
    if (! self._schema) return null;
    var m = new self._BaseModel(doc, self._schema);
    var err = m.validate();
    if (err) {
      return err;
    }
    return null;
  }
});

_.each(["before", "after"], function (type) {
  Meteor.Collection.prototype[type] = function (obj) {
    var self = this;
    _.each(obj, function (fn, verb) {
      if (! _.isFunction(fn)) {
        throw new Error('Expected ' + type + ' ' + verb + 
          ' to be of type Function; not of type ' + (typeof fn));
      }
      if (! self._processors) self._processors = {};
      if (! self._processors[verb]) self._processors[verb] = {};
      if (! self._processors[verb][type]) self._processors[verb][type] = [];

      self._processors[verb][type].push(fn);
    });
  };
});


/////////////////////////////
// Alternative Constructor //
/////////////////////////////

Collection = function (name, options) {
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

  if (! options.transform) {
    options.transform = function (doc) {
      var m = self.create(doc);
      m._collection = self;
      return m;
    };
  }

  Meteor.Collection.call(this, name, options);
};

Collection.prototype = new Meteor.Collection(null);

Collection.prototype.constructor = Collection;
