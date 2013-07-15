Package.describe({
  summary: 'Belt Schema. For use with Meteor Belt applications'
});

Package.on_use(function (api, where) {
  api.use('underscore');
  api.add_files([
    'schema_common.js'
    ], ['client', 'server']);
});

Package.on_test(function (api) {
  api.use('belt-schema');
  api.use('tinytest');

  api.add_files([
    'schema_populate_tests.js',
    'schema_validate_tests.js'
  ], ['client', 'server']);
});
