Package.describe({
  summary: 'Belt Plugins. For use with Meteor Belt applications'
});

Package.on_use(function (api) {
  api.use('belt');
  api.use('roles');
  api.use('underscore');
  api.add_files([
    'plugins_common.js'
  ], ['client', 'server']);
});

Package.on_test(function (api) {
  api.use('belt-plugins');
  api.use('tinytest');

  api.add_files([
    'plugins_tests.js'
  ], 'client');
});
