Package.describe({
  summary: "Font-Awesome for use with MeteorBelt Apps"
});

Package.on_use(function (api) {
  api.add_files('font-awesome/font/fontawesome-webfont.eot', 'client');
  api.add_files('font-awesome/font/fontawesome-webfont.svg', 'client');
  api.add_files('font-awesome/font/fontawesome-webfont.ttf', 'client');
  api.add_files('font-awesome/font/fontawesome-webfont.woff', 'client');
  api.add_files('font-awesome/font/FontAwesome.otf', 'client');
  api.add_files('font-awesome/css/font-awesome.css', 'client');

  // font path override
  api.add_files('path-override.css', 'client');
});
