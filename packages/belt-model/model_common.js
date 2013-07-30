Model = function (doc, schema, collection) {
  // Create a unique Id for the model.
  // This will be used as prefix for method calls
  // Use the collection name if present
  var key = 'model.';
  if (collection && collection._name) {
    this._collection = collection;
    this._key = key + collection._name + '.';
  } else {
    this._key = key + Random.hexString(8) + '.';
  }

  if (schema) {
    this._schema = schema;
    // Add the _id schema
    this.schema({_id: { type: String }});
    this._populate(doc);
  } else {
    _.extend(this, doc);
  }
};

var checkForCollection = function (self) {
  if (! self._collection) {
    throw new Error('save is only available when Model is used ' +
                    'with a Collection.');
  }
};

_.extend(Model.prototype, {

  // _schema: null,

  _methods: {},

  /**
   * strips unnecessary properties and methods
   * @return {Object}
   */
  toObject: function () {
    // remove some internal properties
    var remove = ['_collection', '_schema', '_key', '_methods'];
    var doc = _.omit(this, remove);
    // remove all functions
    // _.each(doc, function (v, k) {
    //   if(typeof v === 'function') {
    //     delete doc[k];
    //   }
    // });
    return doc;
  },

  schema: function (obj) {
    _.extend(this._schema, obj);
  },

  // XXX Keep this as an internal method until the desired behavior
  // has been determined
  //
  // Currently populate replaces all attributes with those that are passed in.
  // Should it simply extend instead?
  _populate: function (doc) {
    if (this._schema) {
      doc = Schema.populate(this._schema, doc || {});
    }
    _.extend(this, doc);
  },

  save: function (fn) {
    checkForCollection(this);
    return this._collection.save(this.toObject(), fn);
  },

  insert: function (fn) {
    checkForCollection(this);
    return this._collection.insert(this.toObject(), fn);
  },

  update: function (fn) {
    checkForCollection(this);
    var obj = this.toObject();
    var id = obj._id;
    delete obj._id;
    return this._collection.update({ _id: id }, { $set: obj }, fn);
  },

  remove: function () {
    checkForCollection(this);
    return this._collection.remove(this._id);
  },

  methods: function (obj) {
    var self = this;

    var m = {};
    _.each(obj, function (val, key) {

      // add ethe method the our model object.
      self[key] = val;

      // create a key for adding Meteor.methods
      meteorKey = self._key + key;

      // if the method already exists return
      // XXX should we allow overriding of existing methods?
      if (! _.isUndefined(self._methods[meteorKey])) {
        return;
      }

      // Add the method to _methods attribute. This is used to track what has
      // already been added
      // TODO remove this -- purhaps we check Meteor directly instead of having
      // to store this information ourselfs.
      self._methods[meteorKey] = val;

      // create Meteor.methods for each method
      m[meteorKey] = function (/** arguments */) {
        return self[key].apply(self, arguments);
      };
    });
    Meteor.methods(m);
  },

  call: function (/** arguments */) {
    var self = this;
    var callback = null;
    var args = _.toArray(arguments);

    if (! args.length)
      // XXX Raise error
      throw new Error('You must provide a method to call');

    var method = args.shift();

    if (_.isFunction(_.last(args)))
      callback = args.pop();
    Meteor.apply(self._key + method, args, callback);
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
   *           error:
   *           {
   *             str: 'should be String'
   *           }
   * 
   *         num is omitted because there was no error.
   */
  validate: function () {
    return Schema.validate(this._schema, this.toObject());
  }
});
