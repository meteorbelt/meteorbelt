

// These are triggered on the server, but only when a client initiates
// the method call. They act similarly to observes, but simply hi-jack
// _validatedInsert. Additionally, they hi-jack the collection
// instance's _collection.insert/update/remove temporarily in order to
// maintain validator integrity (allow/deny).
_.extend(Meteor.Collection.prototype, {

  // override
  __validatedInsert: Meteor.Collection.prototype._validatedInsert,
  _validatedInsert: function (userId, doc) {
    var result, id;
    var self = this;

    var _insert = self._collection.insert;
    self._collection.insert = function (doc) {
      if (self._process("before", "insert", [userId, doc]) !== false) {
        // Validate against schema
        var err = self.validate(doc);
        if (err) {
          throw new Error('Validation Error');
        }
        id = _insert.call(this, doc);
        var args = [userId, id && this.findOne({_id: id}) || doc];
        self._process("after", "insert", args);
      }
    };
    self.__validatedInsert(userId, doc);
    self._collection.insert = _insert;
  },

  // override
  // __validatedUpdate: Meteor.Collection.prototype._validatedUpdate,
  // _validatedUpdate: function (userId, selector, mutator, options) {
  //   var result, previous;
  //   var self = this;

  //   var doc = this.findOne(selector);
  //   var _update = self._collection.update;
  //   self._collection.update = function (selector, mutator, options) {
  //     var args = [userId, doc, selector, mutator, options];
  //     if (self._process("before", "update", args) !== false) {
  //       previous = this.find(selector).fetch();
  //       // xxx validation needed
  //       _update.call(this, selector, mutator, options);
  //       args = [userId, selector, mutator, options, previous];
  //       self._process("after", "update", args);
  //     }
  //   };
  //   self.__validatedUpdate(userId, selector, mutator, options);
  //   self._collection.update = _update;
  // },

  // override
  __validatedRemove: Meteor.Collection.prototype._validatedRemove,
  _validatedRemove: function (userId, selector) {
    var result, previous;
    var self = this;

    var _remove = self._collection.remove;
    self._collection.remove = function (selector) {
      var args = [userId, selector, previous];
      if (self._process("before", "remove", args) !== false) {
        previous = this.find(selector).fetch();
        _remove.call(this, selector);
        args = [userId, selector, previous];
        self._process("after", "remove", args);
      }
    };
    self.__validatedRemove(userId, selector);
    self._collection.remove = _remove;
  }
});
