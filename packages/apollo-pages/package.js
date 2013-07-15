Package.describe({
  summary: "Apollo Pages. For use with Meteor Belt applications"
});

Package.on_use(function (api, where) {
  api.use('router', 'client');

  api.use(['deps', 'underscore', 'templating',
           'handlebars', 'spark', 'session'], 'client');

  api.add_files([
    'pages/detail.html',
    'pages/detail.js'
  ], 'client');
});
