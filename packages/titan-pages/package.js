Package.describe({
  summary: "Titan Pages. For use with Meteor Belt applications"
});

Package.on_use(function (api, where) {
  api.use(['deps', 'underscore', 'templating',
           'handlebars', 'spark', 'session'], 'client');

  api.add_files([
    'pages/detail.html',
    'pages/detail.js'
  ], 'client');
});
