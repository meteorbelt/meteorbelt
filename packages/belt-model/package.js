Package.describe({
  summary: 'Belt Model. For use with Meteor Belt applications'
});

Package.on_use(function (api, where) {
  api.use('belt');
  api.use('belt-schema');
  api.use('underscore');
  api.add_files('model_common.js', ['client', 'server']);
});

Package.on_test(function (api) {
  api.use('belt-model');
  api.use('tinytest');

  api.add_files('model_tests.js', ['client']);
});
