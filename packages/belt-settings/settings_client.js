// Subscribe
// ---------
Meteor.subscribe('settings');

Deps.autorun(function () {
  var s = Belt.Settings.findOne();
  if (s) {
    Belt.settings = s.data;
  } else {
    Belt.settings = undefined;
  }
});
