// Publish
// -------
// a single order, identified by id
Meteor.publish('order', function (id) {
  // An admin can view all orders
  if (!Roles.userIsInRole(this.userId, 'admin')) {
    return Orders.find(id);
  }
  // A user can only view their orders
  return Orders.find({
    _id: id,
    userId: this.userId
  });
});

Meteor.publish('orders', function (query, options) {
  // An admin can view all orders
  if (!Roles.userIsInRole(this.userId, 'admin')) {
    return Orders.find(query, options);
  }
  // A user can only view their orders
  query.userId = this.userId;
  return Orders.find(query, options);
});

// Rules
// -----
Orders.allow({
  insert: function (userId, doc) {
    return Roles.userIsInRole(userId, 'admin');
  },
  update: function (userId, docs, fields, modifier) {
    return Roles.userIsInRole(userId, 'admin');
  },
  remove: function (userId, docs) {
    return Roles.userIsInRole(userId, 'admin');
  }
});
