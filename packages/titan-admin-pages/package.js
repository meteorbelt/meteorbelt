Package.describe({
  summary: "Apollo Admin Pages. For use with Meteor Belt applications"
});

Package.on_use(function (api, where) {
  api.use(['deps', 'underscore', 'templating',
           'handlebars', 'spark', 'session'], 'client');

  api.add_files([
    'pages/detail.html',
    'pages/detail.js',
    'pages/list.html',
    'pages/list.js',

    'admin_pages_client.js'
  ], 'client');

  api.imply('belt-page');
});
