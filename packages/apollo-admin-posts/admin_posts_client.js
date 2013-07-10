
Meteor.startup(function () {
  var page = {
    _id: 'posts',
    name: 'Posts',
    url: '/admin/posts',
    subpages: [
      {
        id: 'list',
        name: 'List',
        url: '/admin/posts'
      }, {
        id: 'create',
        name: 'Create',
        url: '/admin/users/new'
      }
    ]
  };
  Belt.AdminPages.addPage(page);
});
