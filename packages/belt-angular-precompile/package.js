Package.describe({
  summary: "Precompile Angular Templates"
});


Package.on_use(function (api) {
  api.add_files('compile.js', 'server');
  api.export('precompile');
});
