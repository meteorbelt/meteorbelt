Package.describe({
  summary: "Provides the Contact Form API. For use with Meteor Belt applications"
});

Package.on_use(function (api, where) {
  api.use('belt');
  api.use('mongo-livedata', ['client', 'server']);
  api.add_files('contact_server.js', 'server');
});

Package.on_test(function (api) {
  api.use('belt-contact');
  api.use('tinytest');

  api.add_files('contact_tests.js', 'server');
});
