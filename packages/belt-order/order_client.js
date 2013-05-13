//
// Subscribe
//
Meteor.autorun(function () {
  Meteor.subscribe('orders', Session.get('orderQuery') || {});
});
