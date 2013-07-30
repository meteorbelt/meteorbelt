Package.describe({
  summary: 'Text tranforms. For use with Meteor Belt applications'
});

Package.on_use(function (api, where) {
  api.use('underscore');
  api.add_files('text_utils_common.js', ['client', 'server']);

  api.export('TextUtils');
});

Package.on_test(function (api) {
  api.use('tinytest');

  api.add_files('text_utils_tests.js', 'server');
});
