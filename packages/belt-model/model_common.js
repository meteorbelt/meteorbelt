// Model
// -----
function Model(doc) {
  _.extend(this, doc);
  this.initialize.apply(this, arguments);
}

// Methods
// -------
Model.extend = Belt.Helpers.extend;

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
  }
});

// Exports
// -------
Belt.Model = Model;
