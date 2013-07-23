// Subscribe
// ---------
// current user
Deps.autorun(function () {
  Meteor.subscribe('currentUser');
});

// users
Deps.autorun(function () {
  var query = Session.get('userQuery') || {};
  var opts  = Session.get('userOptions') || {};
  Meteor.subscribe('users', query, opts);
});
