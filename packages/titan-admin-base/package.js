Package.describe({
  summary: "Titan Admin Base. For use with Meteor Belt applications"
});

Package.on_use(function (api, where) {
  api.use('belt-collection');

  api.use(['deps', 'underscore', 'templating',
           'handlebars', 'spark', 'session'], 'client');

  api.add_files([
    'admin/home.html',
    'admin/layout.html',
    'admin/nav.html',
    'admin/nav.js',

    'admin_client.js'
  ], 'client');

  api.export('AdminPages');
});

Package.on_test(function (api) {
  api.use('titan-admin-base');
  api.use('tinytest');

  api.add_files('admin_tests.js', 'client');
});
