Package.describe({
  summary: "Apollo Posts. For use with Meteor Belt applications"
});

Package.on_use(function (api, where) {
  api.use(['deps', 'underscore', 'templating',
           'handlebars', 'spark', 'session'], 'client');

  api.add_files([
    'posts/detail.html',
    'posts/detail.js',
    'posts/list.html',
    'posts/list.js',
    'posts/sidebar.html',
    'posts/sidebar.js'
  ], 'client');
});
