// @export CollectionPlugins.tags
CollectionPlugins.tags = function (collection, options) {

  options = _.defaults(options || {}, { required: true, type: 'string' })

  collection.schema({
    tags: [options.type]
  });

  collection.statics({
    findByTag: function (tags, options, callback) {
      return this.find({tags: tags}, options, callback);
    }
  });
  
  // Only create an index on the server, and for collections that are persisted.
  if (Meteor.isServer && collection._name) {
    collection._ensureIndex({
      'tags': 1
    });
  }
};

// @export CollectionPlugins.owner
CollectionPlugins.owner = function (collection, options) {

  options = _.defaults(options || {}, { required: true });

  collection.schema({
    ownerId: { type: String, required: options.required }
  });

  collection.before({
    
    insert: function (userId, doc) {
      // XXX remove userId
      userId = Meteor.userId();
      if (doc.ownerId) {
        // allow user to be filled in by admin
        // XXX logic
        return;
      }

      doc.ownerId = userId;
    },

    update: function (userId, selector, modifier) {
      // XXX remove userId
      userId = Meteor.userId();
      if (! modifier.$set) modifier.$set = {};
      // XXX logic
      // allow user to be filled in by admin
      modifier.$set.ownerId = userId;
    }

  });

  collection.methods({

    owner: function () {
      if (!this.ownerId) return
      return Meteor.users.findOne(this.ownerId);
    }

  });

  // Only create an index on the server, and for collections that are persisted.
  if (Meteor.isServer && collection._name) {
    collection._ensureIndex({
      'ownerId': 1
    });
  }
};

// @export CollectionPlugins.createdAt
CollectionPlugins.createdAt = function (collection, options) {

  options = _.defaults(options || {}, { required: true });

  collection.schema({
    createdAt: { type: Date, required: options.required }
  });

  collection.before({

    insert: function (userId, doc) {
      doc.createdAt = new Date();
    },

    update: function (userId, selector, modifier) {
      if (! modifier.$set) modifier.$set = {};
      
      if (modifier.$set.createdAt)
        // a user should not be able to modify the createdAt attribute
        // once it's been set
        // TODO: allow admin override. 
        delete modifier.$set.createdAt;
    }

  });
};

// @export CollectionPlugins.updatedAt
CollectionPlugins.updatedAt = function (collection, options) {

  options = _.defaults(options || {}, { required: true });

  collection.schema({
    updatedAt: { type: Date, required: options.required }
  });

  collection.before({

    insert: function (userId, doc) {
      doc.updatedAt = new Date();
    },

    update: function (userId, selector, modifier) {
      if (! modifier.$set) modifier.$set = {};
      modifier.$set.updatedAt = new Date();
    }

  });
};

// @export CollectionPlugins.isPublic
CollectionPlugins.isPublic = function (collection, options) {

  options = _.defaults(options || {}, { required: true });

  collection.schema({
    isPublic: { type: Boolean, required: options.required, 'default': false }
  });

  collection.statics({
    findPublic: function (query, options, callback) {
      query = qeury || {};
      query.isPublic = true;
      return this.find(query, options, callback);
    }
  });
};
