Package.describe({
  summary: "Provides a Page API. For use with Meteor Belt applications"
});

Package.on_use(function (api, where) {
  api.use('belt');
  api.use('belt-collection');
  api.use('deps', 'client');
  api.use('session', 'client');

  api.add_files('page_common.js', ['client', 'server']);
  api.add_files('page_client.js', 'client');
  api.add_files('page_server.js', 'server');
});

Package.on_test(function (api) {
  api.use('belt-page');
  api.use('tinytest');

  api.add_files('page_tests.js', 'server');
});
