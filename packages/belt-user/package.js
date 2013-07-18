Package.describe({
  summary: "User management for Meteor Belt"
});

Package.on_use(function (api, where) {
  api.use('belt-collection');
  
  api.use('deps', 'client');
  api.use(['accounts-base', 'underscore'], ['client', 'server']);

  api.add_files('user_common.js', ['client', 'server']);
  api.add_files('user_client.js', 'client');
  api.add_files('user_server.js', 'server');
});

Package.on_test(function (api) {
  api.use('belt-user');
  api.use('tinytest');

  api.add_files('user_tests.js', 'client');
});
