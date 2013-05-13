// Subscribe
// ---------
Meteor.autorun(function () {
  var query = Session.get('postQuery') || {};
  var opts = Session.get('postOptions') || {};
  Meteor.subscribe('posts', query, opts);
});
