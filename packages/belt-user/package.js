Package.describe({
  summary: "User management for Meteor Belt"
});

Package.on_use(function (api, where) {
  api.use('accounts-base');
  api.use('belt-collection');
  api.use('belt-collection-plugins');
  api.use('session');
  api.use('underscore');
  
  api.use('deps', 'client');

  api.add_files('user_common.js', ['client', 'server']);
  api.add_files('user_client.js', 'client');
  api.add_files('user_server.js', 'server');
});

Package.on_test(function (api) {
  api.use('belt-user');
  api.use('tinytest');

  api.add_files('user_tests.js', 'client');
});
