
Meteor.startup(function () {
  var page = {
    _id: 'products',
    name: 'Products',
    url: '/admin/products',
    subpages: [
      {
        id: 'list',
        name: 'List',
        url: '/admin/products'
      }, {
        id: 'create',
        name: 'Create',
        url: '/admin/products/new'
      }
    ]
  };
  AdminPages.addPage(page);
});
