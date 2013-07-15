Package.describe({
  summary: "Apollo Admin Images. For use with Meteor Belt applications"
});

Package.on_use(function (api, where) {
  api.use('router', 'client');

  api.use(['deps', 'underscore', 'templating',
           'handlebars', 'spark', 'session'], 'client');

  api.add_files([
    'images/list.html',
    'images/list.js',
  
    'admin_images_client.js'
  ], 'client');
});
