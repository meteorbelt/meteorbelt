Package.describe({
  summary: "Provides a client side flash notification system. For use with Meteor Belt applications"
});

Package.on_use(function (api, where) {
  api.add_files('flash_client.js', 'client');

  api.export('Flash');
});

Package.on_test(function (api) {
  api.use('belt-flash', 'client');
  api.use('test-helpers', 'client');
  api.use('tinytest', 'client');

  api.add_files('flash_tests.js', 'client');
});
