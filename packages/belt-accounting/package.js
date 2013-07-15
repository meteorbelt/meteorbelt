Package.describe({
  summary: "Provides accounting.js. For use with Meteor Belt applications"
});

Package.on_use(function (api, where) {
  api.add_files([
    'accounting.js'], 'client');
});

Package.on_test(function (api) {});
