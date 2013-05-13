// Subscribe
// ---------
Meteor.autorun(function () {
  Meteor.subscribe('images', Session.get('imageQuery') || {});
});
