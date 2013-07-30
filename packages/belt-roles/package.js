Package.describe({
  summary: "Roles. For use with Meteor Belt applications"
});

Package.on_use(function (api, where) {
  api.use('roles');

  api.add_files('roles_common.js', 'server');

  api.imply('roles');
});
