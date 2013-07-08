
Meteor.startup(function () {
  var users = Meteor.users.find().fetch();
  var page = {
    id: 'users',
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
  Belt.AdminPages.addPage(page);
});
