// Publish
// -------
// a single page, identified by slug
Meteor.publish('page', function (slug) {
  return Pages.find({
    slug: slug
  });
});

Meteor.publish('pages', function (query, options) {
  return Pages.find(query);
});
