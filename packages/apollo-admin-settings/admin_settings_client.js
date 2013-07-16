
Deps.autorun(function () {
  var settings = Belt.Settings.find().fetch();
  var page = {
    _id: 'settings',
    name: 'Settings',
    url: '/admin/settings',
    subpages: _.map(settings, function (s) {
      return {
        id: s._id,
        name: TextUtils.camelCaseToTitle(s._id),
        url: '/admin/settings/' + s._id
      };
    })
  };
  AdminPages.addPage(page);
});
