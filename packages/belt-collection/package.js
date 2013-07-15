Package.describe({
  summary: 'Belt Collection. For use with Meteor Belt applications'
});

Package.on_use(function (api, where) {
  api.use('belt-model');
  api.use('underscore');
  api.add_files([
    'collection_common.js'
  ], ['client', 'server']);
  api.add_files('collection_server.js', 'server');
  api.add_files('collection_client.js', 'client');
});

Package.on_test(function (api) {
  api.use('belt-collection');
  api.use('tinytest');

  api.add_files([
    'collection_tests.js',
    'collection_processor_tests.js'
  ], 'client');
});
