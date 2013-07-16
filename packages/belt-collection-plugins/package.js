Package.describe({
  summary: 'Belt Collection Plugins. For use with Meteor Belt applications'
});

Package.on_use(function (api) {
  api.use('roles');
  api.use('underscore');
  api.add_files([
    'plugins_collection_common.js'
  ], ['client', 'server']);
});

Package.on_test(function (api) {
  api.use('belt-collection-plugins');
  api.use('tinytest');

  api.add_files([
    'plugins_collection_tests.js'
  ], 'client');
});
