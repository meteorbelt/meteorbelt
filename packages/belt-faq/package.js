Package.describe({
  summary: "Provides a FAQ API. For use with Meteor Belt applications"
});

Package.on_use(function (api, where) {
  api.add_files('faq_common.js', ['client', 'server']);
});

Package.on_test(function (api) {
  api.use('belt-faq');
  api.use('tinytest');

  api.add_files('faq_tests.js', 'server');
});
