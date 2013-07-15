Package.describe({
  summary: 'Belt Validation. For use with Meteor Belt applications'
});

Package.on_use(function (api, where) {
  api.use('belt-error');
  api.use('underscore');
  api.add_files([
    'validation.js'
    ], ['client', 'server']);
});

Package.on_test(function (api) {
  api.use('belt-validation');
  api.use('belt-model');
  api.use('tinytest');

  api.add_files('validation_tests.js', 'client');
});
