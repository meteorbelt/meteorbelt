Package.describe({
  summary: "Angular For use with MeteorBelt apps"
});


Package.on_use(function (api) {
  api.add_files('bower_components/angular/angular.js', 'client', { bare: true });
});

