Package.describe({
  summary: "Provides a Order API. For use with Meteor Belt applications"
});

Package.on_use(function (api, where) {
  api.use('belt');
  api.use('roles', ['client', 'server']);
  api.use('mongo-livedata', ['client', 'server']);
  api.add_files('order_common.js', ['client', 'server']);
  api.add_files('order_client.js', 'client');
  api.add_files('order_server.js', 'server');
});

Package.on_test(function (api) {
  api.use('belt-order');
  api.use('tinytest');

  api.add_files('order_tests.js', 'server');
});
