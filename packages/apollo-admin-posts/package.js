Package.describe({
  summary: "Apollo Admin Posts. For use with Meteor Belt applications"
});

Package.on_use(function (api, where) {
  api.use('router', 'client');

  api.use(['deps', 'underscore', 'templating',
           'handlebars', 'spark', 'session'], 'client');

  api.add_files([
    'posts/detail.html',
    'posts/detail.js',
    'posts/detail_preview.html',
    'posts/detail_preview.js',
    'posts/detail_settings.html',
    'posts/list.html',
    'posts/list.js',
    'posts/list_item.html',
    'posts/list_item.js',

    'admin_posts_client.js'
  ], 'client');
});
