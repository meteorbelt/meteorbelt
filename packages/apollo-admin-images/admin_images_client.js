
Meteor.startup(function () {
  var page = {
    _id: 'images',
    name: 'Images',
    url: '/admin/images',
    subpages: [
      {
        id: 'list',
        name: 'List',
        url: '/admin/posts'
      }, {
        id: 'create',
        name: 'Create',
        url: '/admin/posts/new'
      }
    ]
  };
  Belt.AdminPages.addPage(page);
});
