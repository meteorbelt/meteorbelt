Package.describe({
  summary: "Apollo Images. For use with Meteor Belt applications"
});

Package.on_use(function (api, where) {
  api.use('belt');
  api.use('router', 'client');

  api.use(['deps', 'underscore', 'templating',
           'handlebars', 'spark', 'session'], 'client');

  api.add_files([
    'images/list.html',
    'images/list.js',
    'images/list_item.html',
    'images/list_item.js',
    'images/modal.html',
    'images/modal.js'
  ], 'client');
});
