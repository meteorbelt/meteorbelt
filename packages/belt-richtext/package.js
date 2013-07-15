Package.describe({
  summary: "Provides a richtext-foundation API. For use with Meteor Belt applications"
});

Package.on_use(function (api, where) {
  api.use('deps', 'client');
  api.use('handlebars', 'client');
  api.use('session', 'client');
  api.use('templating', 'client');

  api.add_files([
    'wysihtml5.css',
    'toolbar.css',
    'handlebars.js',
    'wysihtml5_default_config.js',
    'wysihtml5-0.4.0pre.js',
    'richtext_link_modal.html',
    'richtext_link_modal.js',
    'richtext_image_modal.html',
    'richtext_image_modal.js',
    'richtext_toolbar.html',
    'richtext_toolbar.js',
    'richtext.html',
    'richtext.js'
  ], 'client');
});

Package.on_test(function (api) {
  api.use('belt-richtext');
  api.use('tinytest');

  // api.add_files('richtext_tests.js', 'server');
});
