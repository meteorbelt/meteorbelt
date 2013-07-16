
Meteor.startup(function () {
  var page = {
    _id: 'images',
    name: 'Images',
    url: '/admin/images',
    subpages: [
      {
        id: 'list',
        name: 'List',
        url: '/admin/images'
      }, {
        id: 'create',
        name: 'Create',
        url: '/admin/images/new'
      }
    ]
  };
  AdminPages.addPage(page);
});
