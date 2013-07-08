
Meteor.startup(function () {
  var settings = Belt.Settings.find().fetch();
  var page = {
    id: 'settings',
    name: 'Settings',
    url: '/admin/settings',
    subpages: _.map(settings, function (s) {
      return {
        id: s._id,
        name: Belt.Text.camelCaseToTitle(s._id),
        url: '/admin/settings/' + s._id
      };
    })
  };
  Belt.AdminPages.addPage(page);
});
