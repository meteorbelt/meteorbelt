// Subscribe
// ---------
Meteor.autorun(function () {
  Meteor.subscribe('tags', Session.get('tagQuery') || {});
});
