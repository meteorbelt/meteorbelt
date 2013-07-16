CollectionPlugins.allowAdmin = function (collection, options) {

  options = options || {
    insert: true,
    update: true,
    remove: true
  };

  if (Meteor.isServer) {

    if (options.insert === true) {
      collection.allow({
        insert: function (userId, doc) {
          // XXX this returns an doc not a boolean
          return Roles.userIsInRole(userId, 'admin');
        }
      });
    }

    if (options.update === true) {
      collection.allow({
        update: function (userId, docs, fields, modifier) {
          // XXX this returns an doc not a boolean
          return Roles.userIsInRole(userId, 'admin');
        }
      });
    }

    if (options.remove === true) {
      collection.allow({
        remove: function (userId, docs) {
          // XXX this returns an doc not a boolean
          return Roles.userIsInRole(userId, 'admin');
        }
      });
    }

  }
};
