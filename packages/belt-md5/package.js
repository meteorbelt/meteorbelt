Package.describe({
  summary: "md5 for Meteor Belt"
});

Package.on_use(function (api, where) {
  api.add_files([
    'crypto-js/core.js',
    'crypto-js/md5.js',
    'md5_common.js'], ['client', 'server']);

  api.export('MD5');
});

Package.on_test(function (api) {
  api.use('belt-md5');
  api.use('tinytest');

  api.add_files('md5_tests.js', 'server');
});
