
Meteor.startup(function () {
  var page = {
    _id: 'users',
    name: 'Users',
    url: '/admin/users',
    postion: 10,
    subpages: [
      {
        id: 'list',
        name: 'List',
        url: '/admin/users'
      }, {
        id: 'create',
        name: 'Create',
        url: '/admin/users/new'
      }
    ]
  };
  AdminPages.addPage(page);
});
