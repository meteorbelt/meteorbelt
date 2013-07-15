Package.describe({
  summary: "Provides IE8 Polyfills. For use with Meteor Belt applications"
});

Package.on_use(function (api, where) {
  api.add_files([
    // 'es5-shim/es5-shim.js',
    // 'es5-shim/es5-sham.js',
    'respond/respond.src.js',
    'console-polyfill/index.js'
  ], 'client', {raw: true});
});
