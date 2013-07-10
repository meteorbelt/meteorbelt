Package.describe({
  summary: "Apollo Admin Base. For use with Meteor Belt applications"
});

Npm.depends({ walkdir: '0.0.7' });

function hasExt(file, ext) {
  ext = '.' + ext;
  if (file.indexOf(ext, file.length - ext.length) !== -1) return true;
  return false;
}

function addFiles(api, package, folder, extension) {
  var walk = Npm.require('walkdir');
  var packagePath = 'packages/' + package + '/';
  var paths = walk.sync(packagePath + folder);
  for (var i = 0; i < paths.length; i++) {
    var f = paths[i].split(packagePath)[1];
    if (hasExt(f, 'html') || hasExt(f, 'js')) {
      api.add_files(f, 'client');
    }
  }
}

Package.on_use(function (api, where) {
  api.use('belt');
  api.use('belt-collection');
  api.use('router', 'client');

  api.use(['deps', 'underscore', 'templating',
           'handlebars', 'spark', 'session'], 'client');

  addFiles(api, 'apollo-admin-base', 'admin');

  api.add_files('admin_client.js', 'client');
});

Package.on_test(function (api) {
  api.use('apollo-admin-base');
  api.use('tinytest');

  api.add_files('admin_tests.js', 'client');
});