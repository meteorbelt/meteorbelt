//
// Subscribe
//
Deps.autorun(function () {
  Meteor.subscribe('currentUser');
  Meteor.subscribe('allUsers');
});
