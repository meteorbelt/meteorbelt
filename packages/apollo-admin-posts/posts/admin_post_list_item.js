Template.adminPostListItem.helpers({
  selected: function () {
    return Session.equals('postId', this._id) ? 'active' : '';
  }
});

Template.adminPostListItem.events({

  'click .delete': function (e, tmpl) {
    e.preventDefault();
    var remove = window.confirm("Are you sure you want to remove this post?");
    if (remove === true) {
      Posts.remove(template.data._id, function (err, post) {
        if (err) {
          return Belt.Flash.error(err.reason);
        }
        // if no error...
        Meteor._debug('post deleted successfully');
      });
    }
  },

  'click .post-list-item': function (e, tmpl) {
    Session.set('postId', tmpl.data._id );
  }
});
