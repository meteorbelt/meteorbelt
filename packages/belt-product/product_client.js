// Subscribe
// ---------
Meteor.autorun(function () {
  Meteor.subscribe('products', Session.get('productsQuery') || {});
});
