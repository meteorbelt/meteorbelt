Package.describe({
  summary: "Provides Analytics. For use with Meteor Belt applications"
});

Package.on_use(function (api, where) {

  api.add_files('analytics_common.js', ['client', 'server']);
  // api.add_files('analytics_client.js', 'client');
  // api.add_files('analytics_server.js', 'server');
});

Package.on_test(function (api) {
  api.use('belt-analytics', 'client');
  api.use('tinytest', 'client');

  api.add_files('belt_analytics_tests.js', 'client');
});
