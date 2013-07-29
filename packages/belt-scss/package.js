Package.describe({
  summary: "SCSS. For use with Meteor Belt apps"
});

Package._transitional_registerBuildPlugin({
  name: "compileScss",
  use: [],
  sources: [
    'plugin/compile-scss.js'
  ],
  npmDependencies: { "node-sass": "0.5.4" }
});

Package.on_test(function (api) {
  // api.use('tinytest');
  // api.use('test-helpers');
  // api.add_files(['scss_tests.scss', 'scss_tests.js'], 'client');
});
