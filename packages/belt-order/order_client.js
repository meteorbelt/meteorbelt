// Subscribe
// ---------
Deps.autorun(function () {
  Meteor.subscribe('orders', Session.get('orderQuery') || {});
});
