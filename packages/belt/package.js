Package.describe({
  summary: 'Core Belt environment. For use with Meteor Belt applications'
});

Package.on_use(function (api, where) {
  api.add_files('belt_common.js', ['client', 'server']);
});

Package.on_test(function (api) {
  api.use('belt');
  api.use('tinytest');

  api.add_files('belt_tests.js', 'server');
});
