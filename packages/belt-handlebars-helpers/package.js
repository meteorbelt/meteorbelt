Package.describe({
  summary: "Provides handlebars helpers. For use with Meteor Belt applications"
});

Package.on_use(function (api, where) {
  api.use('belt');
  api.add_files('handlebars_helpers_client.js', 'client');
});

Package.on_test(function (api) {
  api.use('tinytest');

  api.add_files('handlebars_helpers_tests.js', 'client');
});
