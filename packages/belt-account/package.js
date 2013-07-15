Package.describe({
  summary: "Provides an Accounts API. For use with Meteor Belt applications"
});

Package.on_use(function (api, where) {
  api.use(['accounts-base', 'underscore'], ['client', 'server']);

  api.add_files('account_common.js', ['client', 'server']);
  api.add_files('account_client.js', 'client');
  api.add_files('account_server.js', 'server');
});

Package.on_test(function (api) {
  api.use('belt-user');
  api.use('tinytest');

  api.add_files('account_tests.js', 'server');
});
