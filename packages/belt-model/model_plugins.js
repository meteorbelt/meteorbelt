// Plugins
// -------

// Tag
// ---
var tag = function (col, options) {
  var required = options.required || false;  

  var tagFunc = function (value) {
    if (!_.isArray(value)) {
      return 'Tags must be an Array';
    }
  };

  col.schema({
    tags: [{ required: required, fn: tagFunc }],
  });

  // tags must be slugs
  if (col.tags) {
    col.tags = _.map(p.tags, function (t) {
      return Belt.Slug.get(t);
    });
  }
  // Save the tags to the Tags Collection
  _.each(p.tags, function (t) {
    if (t) {
      Tags.Insert({
        owner: p.owner,
        slug: t
      });
    }
  });
  collection.before({
    insert: function(doc, user) {

    }
  });
};

var validate = function(collection, options) {
    var err = self.validate();
    if (err) {
      throw new Meteor.Error(403, err);
    }
};
