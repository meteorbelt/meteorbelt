Package.describe({
  summary: "Titan Theme for use with Titan Apps"
});

Package.on_use(function (api, where) {
  api.add_files('stylesheets/app.css', 'client');
});
