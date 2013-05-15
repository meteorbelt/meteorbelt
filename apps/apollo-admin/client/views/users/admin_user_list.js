Template.adminUserList.helpers({
  allUser: function () {
    return Meteor.users.find();
  }
});
