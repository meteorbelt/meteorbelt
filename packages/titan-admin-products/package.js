Package.describe({
  summary: "Apollo Admin Products. For use with Meteor Belt applications"
});

Package.on_use(function (api, where) {
  api.use(['deps', 'underscore', 'templating',
           'handlebars', 'spark', 'session'], 'client');

  api.add_files([
    'products/detail.html',
    'products/detail.js',
    'products/list.html',
    'products/list.js',

    'admin_products_client.js'
  ], 'client');
});
