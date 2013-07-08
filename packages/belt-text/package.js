Package.describe({
  summary: 'Text tranforms. For use with Meteor Belt applications'
});

Package.on_use(function (api, where) {
  api.use('belt');
  api.use('underscore');
  api.add_files('text_common.js', ['client', 'server']);
});

Package.on_test(function (api) {
  api.use('belt');
  api.use('tinytest');

  api.add_files('text_tests.js', 'server');
});
