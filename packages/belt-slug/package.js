Package.describe({
  summary: "Provides a Slug API. For use with Meteor Belt applications"
});

Package.on_use(function (api, where) {
  api.use('belt-collection-plugins');
  api.use('underscore');

  api.add_files('slug_common.js', ['client', 'server']);

  api.export('Slug');
});

Package.on_test(function (api) {
  api.use('belt-collection');
  api.use('belt-collection-plugins');
  api.use('belt-slug');
  
  api.use('tinytest');

  api.add_files('slug_tests.js', 'client');
});
