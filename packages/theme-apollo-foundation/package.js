Package.describe({
  summary: "Apollo Theme for use with Apollo Apps"
});

Package.on_use(function (api, where) {
  api.add_files('stylesheets/app.css', 'client');
});
