// Publish
// -------
// a single image, identified by slug
Meteor.publish('image', function (id) {
  return Images.find({
    _id: id
  });
});

Meteor.publish('images', function (query, options) {
  return Images.find(query);
});
