Template.adminUserListItem.helpers({
  avatarUrl: function () {
    return this.avatarUrl(30);
  },
  displayName: function () {
    return this.displayName();
  },
  email: function () {
    return this.email;
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
        // XXX Unsafe
        Meteor.call('userAddUsersToRoles', tmpl.data._id, 'admin', function (err) {
          Flash.error('an error occured: ', err);
        });
        Roles.addUsersToRoles(tmpl.data._id, ['admin']);
        return;
      }
      return;
    }
    // XXX Unsafe
    Meteor.call('userRemoveUsersFromRoles', tmpl.data._id, 'admin', function (err) {
      if (err) {
        Flash.error('an error occured: ', err);
      }
    });
    return;
  },

  'click tr': function (e, tmpl) {
    return Router.go(Meteor.Router.adminUserDetailPath(this._id));
  },

  'click .delete': function (e, tmpl) {
    e.preventDefault();
    var remove = window.confirm("Are you sure you want to remove this post?");
    if (remove === true) {
      Posts.remove(tmpl.data._id, function (err, post) {
        if (err) {
          return Flash.error(err.reason);
        }
        // if no error...
        console.log('post deleted successfully');
      });
    }
  }
});
