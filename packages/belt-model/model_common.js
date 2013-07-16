// @export Orders
Model = function (doc, schema) {
  if (schema) {
    this._schema = schema;
    // Add the _id schema
    this.schema({_id: { type: String }});
    this._populate(doc);
  } else {
    _.extend(this, doc);
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

// Exports
// -------

Belt.Model = Model;
