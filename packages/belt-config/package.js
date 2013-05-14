Package.describe({
  summary: 'Belt Config. For use with Meteor Belt applications'
});

Package.on_use(function (api, where) {
  api.use('belt');
  api.use('underscore');
  api.add_files('config_common.js', ['client', 'server']);
});

Package.on_test(function (api) {
  api.use('belt-config');
  api.use('tinytest');

  api.add_files('config_tests.js', ['client', 'server']);
});