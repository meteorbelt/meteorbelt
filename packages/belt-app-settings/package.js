Package.describe({
  summary: 'Belt Settings extends Meteor.Settings to provide datastore configurable settings. For use with Meteor Belt applications'
});

Package.on_use(function (api, where) {
  api.use('belt-collection');
  api.use('deps', 'client');
  api.use('underscore');
  
  api.add_files('app_settings_common.js', ['client', 'server']);
  api.add_files('app_settings_server.js', 'server');
  api.add_files('app_settings_client.js', 'client');
});

Package.on_test(function (api) {
  api.use('belt-app-settings');
  api.use('tinytest');

  api.add_files('app_settings_tests.js', 'server');
});
