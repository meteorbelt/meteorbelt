Package.describe({
  summary: "AngularJS UI Rotuer. For use with MeteorBelt apps"
});


Package.on_use(function (api) {
  api.use('belt-angular', 'client');
  api.add_files('bower_components/angular-ui-router.js/index.js', 'client', { bare: true });
});

