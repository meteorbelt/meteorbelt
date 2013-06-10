Package.describe({
  summary: "Provides IE8 Polyfills. For use with Meteor Belt applications"
});

Package.on_use(function (api, where) {
  api.add_files('respond/respond.src.js', 'client', {raw: true});
});
