Package.describe({
  summary: "Provides a richtext-foundation API. For use with Meteor Belt applications"
});

Package.on_use(function (api, where) {
  api.use('belt');
  api.use('mongo-livedata', 'client');
  api.use('templating', 'client');

  api.add_files([
    'wysihtml5.css',
    'toolbar.css',
    'handlebars.js',
    'wysihtml5_default_config.js',
    'wysihtml5-0.4.0pre.js',
    'richtext_link_dialog.html',
    'richtext_link_dialog.js',
    'richtext_image_dialog.html',
    'richtext_image_dialog.js',
    'richtext_toolbar.html',
    'richtext_toolbar.js',
    'richtext.html',
    'richtext.js'], 'client');
});

Package.on_test(function (api) {
  api.use('belt-richtext-bootstrap');
  api.use('tinytest');

  //api.add_files('tests/lib/richtext-bootstrap_tests.js', 'server');
});
