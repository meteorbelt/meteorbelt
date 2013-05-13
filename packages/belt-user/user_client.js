//
// Subscribe
//
Meteor.autorun(function () {
  Meteor.subscribe('currentUser');
  Meteor.subscribe('allUsers');
});
