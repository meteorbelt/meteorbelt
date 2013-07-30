Package.describe({
  summary: "Provides Gravatar API. For use with Meteor Belt applications"
});

Package.on_use(function (api, where) {
  api.use('belt-md5');
  api.use('underscore');
  api.add_files('gravatar_common.js', ['client', 'server']);

  api.export('Gravatar');
});

Package.on_test(function (api) {
  api.use('belt-gravatar');
  api.use('tinytest');

  api.add_files('gravatar_tests.js', 'server');
});
