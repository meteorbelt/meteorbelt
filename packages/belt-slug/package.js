Package.describe({
  summary: "Provides a Slug API. For use with Meteor Belt applications"
});

Package.on_use(function (api, where) {
  api.use('belt-collection-plugins');
  api.add_files('slug_common.js', ['client', 'server']);
});

Package.on_test(function (api) {
  api.use('belt-slug');
  api.use('tinytest');

  api.add_files('slug_tests.js', 'server');
});
