Package.describe({
  summary: "Apollo Theme. For use with Meteor Belt applications"
});

Package.on_use(function (api, where) {
  api.use('less', 'client');

  api.add_files([
    'styles/_bootstrap.less',
    'styles/layout.less',
    'styles/pages/home.less'
  ], 'client');
});
