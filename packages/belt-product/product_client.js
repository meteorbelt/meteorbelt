// Subscribe
// ---------
Deps.autorun(function () {
  Meteor.subscribe('products', Session.get('productsQuery') || {});
});
