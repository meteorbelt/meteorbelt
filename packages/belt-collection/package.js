Package.describe({
  summary: 'Belt Collection -- wraps Meteor.Collection to provide additional functionality. For use with Meteor Belt applications'
});

Package.on_use(function (api, where) {
  api.use('belt');
  api.use('belt-model');
  api.use('belt-validation');
  api.use('underscore');
  api.add_files('collection_common.js', ['client', 'server']);
});

Package.on_test(function (api) {
  api.use('belt-collection');
  api.use('tinytest');

  api.add_files('collection_tests.js', ['client']);
});
