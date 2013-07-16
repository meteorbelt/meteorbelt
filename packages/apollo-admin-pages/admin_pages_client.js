
Meteor.startup(function () {
  var page = {
    _id: 'pages',
    name: 'Pages',
    url: '/admin/pages',
    subpages: [
      {
        id: 'list',
        name: 'List',
        url: '/admin/pages'
      }, {
        id: 'create',
        name: 'Create',
        url: '/admin/pages/new'
      }
    ]
  };
  AdminPages.addPage(page);
});
