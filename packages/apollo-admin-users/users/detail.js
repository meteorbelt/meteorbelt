Template.adminUserDetail.helpers({
  user: function () {
    return Meteor.users.findOne(Session.get('userQuery'));
  },
  email: function () {
    var u = Meteor.users.findOne(Session.get('userQuery'));
    if (u)
      return u.email;
    return '';
  },
  avatarUrl: function () {
    var u = Meteor.users.findOne(Session.get('userQuery'));
    if (u)
      return u.avatarUrl(150);
    return '';
  }
});
