// Subscribe
// ---------
Meteor.autorun(function () {
  Meteor.subscribe('pages', Session.get('pageQuery') || {});
});
