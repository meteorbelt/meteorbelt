Template.body.helpers({
  layoutName: function () {
    var isAdmin = Meteor.Router.page().indexOf('admin') === 0;
    if (isAdmin) {
      return 'adminLayout';
    }
    return 'layout';
  }
});
