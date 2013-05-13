Package.describe({
  summary: 'Belt Errors. For use with Meteor Belt applications'
});

Package.on_use(function (api, where) {
  api.use('belt');
  api.use('underscore');
  api.add_files('error_common.js', ['client', 'server']);
});

Package.on_test(function (api) {
  api.use('belt-error');
  api.use('tinytest');

  api.add_files('error_tests.js', 'server');
});
