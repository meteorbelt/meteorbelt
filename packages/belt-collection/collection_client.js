Meteor.Collection.prototype.when = function (condition, callback) {
  var self = this;
  Deps.autorun(function (c) {
    if (condition.call(self._collection)) {
      c.stop();
      callback.call(self._collection);
    }
  });
};
