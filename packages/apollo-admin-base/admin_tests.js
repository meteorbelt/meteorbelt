Tinytest.add('belt - AdminPages - Belt.AdminPages is Global', function (test) {
  test.isTrue(typeof Belt.AdminPages !== 'undefined');
});

Tinytest.add('belt - AdminPages - addPage', function (t) {

  var page = {
    id: 'settings',
    name: 'Settings',
    url: '/admin/settings',
    subpages: [
      {
        id: 'googleAnalytics',
        name: 'Google Analytics',
        url: '/admin/settings/analytics'
      }
    ]
  };

  Belt.AdminPages.addPage(page);

  var p = Belt.AdminPages.find().fetch()[0];

  _.each(page, function (val, key) {
    t.equal(page[key], p[key]);
  });
});
