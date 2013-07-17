// @export Model
Model = function (doc, schema, collection) {
  if (schema) {
    this._collection = collection;
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

  /**
   * strips unnecessary properties and methods
   * @return {Object}
   */
  toObject: function () {
    // remove some internal properties
    var remove = ['_collection', '_schema'];
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
    return this._collection.update({ _id: id }, obj, fn);
  },

  remove: function () {
    checkForCollection(this);
    return this._collection.remove(this._id);
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
