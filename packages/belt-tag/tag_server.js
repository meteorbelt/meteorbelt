// Publish
// -------

// a single tag, identified by slug
Meteor.publish('tag', function (slug) {
  return Tags.find({
    slug: slug
  });
});

Meteor.publish('tags', function (query, options) {
  return Tags.find(query, options);
});
