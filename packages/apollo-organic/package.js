Package.describe({
  summary: "Apollo Theme. For use with Meteor Belt applications"
});

Npm.depends({ walkdir: '0.0.7' });

function addThemeFiles(api, name) {
  var walk = Npm.require('walkdir');
  var packagePath = 'packages/' + name + '/';
  var paths = walk.sync(packagePath);
  for (var i = 0; i < paths.length; i++) {
    var f = paths[i].split(packagePath)[1];
    if (f.indexOf('.less', f.length - 5) !== -1) {
      api.add_files(f, 'client');
    }
  }
}

Package.on_use(function (api, where) {
  api.use('belt');
  api.use('less', 'client');

  addThemeFiles(api, 'apollo-organic');
});
