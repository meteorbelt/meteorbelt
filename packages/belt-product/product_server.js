// Publish
// -------
// a single product, identified by slug
Meteor.publish('product', function (slug) {
  return Products.find({
    slug: slug
  });
});

Meteor.publish('products', function (query, options) {
  // if not an admin return only published records
  if (!Roles.userIsInRole(this.userId, 'admin')) {
    query.isPublished = true;
  }
  return Products.find(query, options);
});
