Template.adminUserDetail.helpers({
  user: function () {
    return Meteor.users.findOne(Session.get('userQuery'));
  }
});
