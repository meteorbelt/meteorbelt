Tinytest.add('belt - AdminPages - AdminPages is Global', function (test) {
  test.isTrue(typeof AdminPages !== 'undefined');
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

  AdminPages.addPage(page);

  var p = AdminPages.find().fetch()[0];

  _.each(page, function (val, key) {
    t.equal(page[key], p[key]);
  });
});
