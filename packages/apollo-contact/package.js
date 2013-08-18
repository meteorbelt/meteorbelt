Package.describe({
  summary: "Apollo Contact. For use with Meteor Belt applications"
});

Package.on_use(function (api, where) {
  api.use(['deps', 'underscore', 'templating',
           'handlebars', 'spark', 'session'], 'client');

  api.add_files([
    'contact/contact.html',
    'contact/contact.js'
  ], 'client');
});
