Package.describe({
  summary: "Apollo Admin Users. For use with Meteor Belt applications"
});

Package.on_use(function (api, where) {
  api.use('belt');
  api.use('router', 'client');

  api.use(['deps', 'underscore', 'templating',
           'handlebars', 'spark', 'session'], 'client');

  api.add_files([
    'users/detail.html',
    'users/detail.js',
    'users/list.html',
    'users/list.js',
    'users/list_item.html',
    'users/list_item.js',

    'admin_users_client.js'
  ], 'client');
});
