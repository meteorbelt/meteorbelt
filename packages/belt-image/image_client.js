// Subscribe
// ---------
Deps.autorun(function () {
  Meteor.subscribe('images', Session.get('imageQuery') || {});
});
