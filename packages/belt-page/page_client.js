// Subscribe
// ---------
Deps.autorun(function () {
  Meteor.subscribe('pages', Session.get('pageQuery') || {});
});
