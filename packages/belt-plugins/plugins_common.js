
// Plugins
// -------

var tags = function (collection, options) {

  options = options || { required: false };

  collection.schema({
    tags: [String]
  });

  collection.before({
    save: function (userId, doc) {
      // tags must be slugs
      if (doc.tags) {
        doc.tags = _.map(doc.tags, function (t) {
          return Belt.Slug.generate(t);
        });
      }
    }
  });

  collection.statics({
    findByTag: function (tags, opts, callback) {
      return this.find({tags: tags}, opts, callback);
    }
  });

  if (Meteor.isServer) {
    collection._ensureIndex({
      'tags': 1
    });
  }
};
var owner = function (collection, options) {

  options = options || { required: true };

  collection.schema({
    owner: { type: String, required: options.required }
  });

  collection.before({
    save: function (userId, doc) {
      if (doc.owner) {
        // allow user to be filled in by admin
        // XXX logic
        return;
      }
      doc.owner = userId;
    }
  });

  if (Meteor.isServer) {
    collection._ensureIndex({
      'owner': 1
    });
  }
};

var createdAt = function (collection, options) {

  options = options || { required: true };

  collection.schema({
    createdAt: { type: Date, required: options.required }
  });

  collection.before({
    insert: function (user, doc) {
      doc.createdAt = new Date();
    }
  });
};

var updatedAt = function (collection, options) {

  options = options || { required: true };

  collection.schema({
    updatedAt: { type: Date, required: options.required }
  });

  collection.before({
    insert: function (user, doc) {
      doc.updatedAt = new Date();
    },
    update: function (userId, selector, modifier) {
      if (! modifier.$set) modifier.$set = {};
      modifier.$set.updatedAt = new Date();
    }
  });
};

var isPublic = function (collection, options) {

  options = options || { required: true };

  collection.schema({
    isPublic: { type: Boolean, required: options.required, 'default': false }
  });

  collection.statics({
    findPublic: function (query) {
      query.isPublic = true;
      return this.find(query);
    }
  });
};

var allowAdmin = function (collection, options) {

  options = options || {
    insert: true,
    update: true,
    remove: true
  };

  if (Meteor.isServer) {

    if (options.insert === true) {
      collection.allow({
        insert: function (userId, doc) {
          return Roles.userIsInRole(userId, 'admin');
        }
      });
    }

    if (options.insert === true) {
      collection.allow({
        update: function (userId, docs, fields, modifier) {
          return Roles.userIsInRole(userId, 'admin');
        },
      });
    } 

    if (options.insert === true) {
      collection.allow({
        remove: function (userId, docs) {
          return Roles.userIsInRole(userId, 'admin');
        }
      });
    }

  }
};

var Plugins = {};

// Properties
Plugins.owner = owner;
Plugins.createdAt = createdAt;
Plugins.updatedAt = updatedAt;
Plugins.isPublic = isPublic;
Plugins.tags = tags;

// Permissions
Plugins.allowAdmin = allowAdmin;

Belt.Plugins = Plugins;
