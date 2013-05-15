Package.describe({
  summary: 'Belt Settings extends Meteor.Settings to provide datastore configurable settings. For use with Meteor Belt applications'
});

Package.on_use(function (api, where) {
  api.use('belt');
  api.use('underscore');
  api.use('mongo-livedata', ['client', 'server']);
  api.add_files('settings_common.js', ['client', 'server']);
  api.add_files('settings_server.js', 'server');
  api.add_files('settings_client.js', 'client');
});

Package.on_test(function (api) {
  api.use('belt-settings');
  api.use('tinytest');

  api.add_files('settings_tests.js', 'server');
});