Template.adminUserListItem.helpers({
  avatarUrl: function () {
    return this.avatarUrl(30);
  },
  displayName: function () {
    return this.displayName();
  },
  email: function () {
    return this.getEmail();
  },
  isAdmin: function () {
    return Roles.userIsInRole(this, 'admin');
  },
  isSelf: function () {
    return this._id === Meteor.userId();
  }
});


Template.adminUserListItem.events({
  'click .is-admin': function (e, tmpl) {
    if (tmpl.find('.is-admin').checked === true) {
      console.log('data', tmpl.data);
      var makeAdmin = window.confirm("Are you sure you want to make " + tmpl.data.profile.name + " an admin?");
      if (makeAdmin === true) {
        Meteor.call('userAddUsersToRoles', tmpl.data._id, 'admin', function (err) {
          Belt.Flash.error('an error occured: ', err);
        });
        Roles.addUsersToRoles(tmpl.data._id, ['admin']);
        return;
      }
      return;
    }
    Meteor.call('userRemoveUsersFromRoles', tmpl.data._id, 'admin', function (err) {
      if (err) {
        Belt.Flash.error('an error occured: ', err);
      }
    });
    return;
  },

  'click tr': function (e, tmpl) {
    return Meteor.Router.to(Meteor.Router.adminUserDetailPath(this._id));
  },

  'click .delete': function (e, tmpl) {
    e.preventDefault();
    var remove = window.confirm("Are you sure you want to remove this post?");
    if (remove === true) {
      Posts.remove(tmpl.data._id, function (err, post) {
        if (err) {
          return Belt.Flash.error(err.reason);
        }
        // if no error...
        console.log('post deleted successfully');
      });
    }
  }
});
