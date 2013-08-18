Package.describe({
  summary: "Apollo Admin Settings. For use with Meteor Belt applications"
});

Package.on_use(function (api, where) {
  api.use('belt-app-settings');
  api.use('belt-text-utils');
  api.use('apollo-admin-base');

  api.use(['deps', 'underscore', 'templating',
           'handlebars', 'spark', 'session'], 'client');

  api.add_files([
    'settings/detail.html',
    'settings/detail.js',
    'settings/list.html',
    'settings/list.js',
    'settings/list_item.html',
    'settings/list_item.js',

    'admin_settings_client.js'
  ], 'client');
});
