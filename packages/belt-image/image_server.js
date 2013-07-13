// Publish
// -------
// a single image, identified by slug
Meteor.publish('image', function (id) {
  // XXX restrict access by userId
  return Images.find({
    _id: id
  });
});

Meteor.publish('images', function (query, options) {
  // XXX restrict access by userId
  return Images.find(query);
});
