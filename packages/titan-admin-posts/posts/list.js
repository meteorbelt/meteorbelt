
Template.adminPostList.helpers({

  allPosts: function () {
    return Posts.find(Session.get('postQuery'), Session.get('postOptions'));
  },

  post: function () {
    return Posts.findOne(Session.get('postId'));
  },

  listView: function () {
    Session.setDefault('listView', true);
    return Session.get('listView');
  }
});

Template.adminPostList.events({
  'click .display-list': function (e) {
    e.preventDefault();
    Session.set('listView', true);
  },

  'click .display-preview': function (e) {
    e.preventDefault();
    Session.set('listView', false);
  }
});

Template.adminPostListPreviewItem.helpers({
  selected: function () {
    return Session.equals('postId', this._id) ? 'active' : '';
  }
});

Template.adminPostListDetailItem.events({
  'click .clickable': function (e, tmpl) {
    e.preventDefault();
    Router.go('/admin/posts/' + tmpl.data._id);
  }

});

Template.adminPostListPreviewItem.events({
  'click .post-list-item': function (e, tmpl) {
    Session.set('postId', tmpl.data._id);
  }
});

Template.adminPostListPreview.helpers({
  // post returns the current post
  post: function () {
    return Posts.findOne( Session.get('postId'));
  }
});

Template.adminPostListPreview.events({
  'click .delete': function (e, tmpl) {
    e.preventDefault();
    var remove = window.confirm("Are you sure you want to remove this post?");
    if (remove === true) {
      var p = Posts.findOne(Session.get('postId'));
      Posts.remove(p._id, function (err) {
        if (err) {
          return Flash.error(err.reason);
        }
        // if no error...
        Meteor._debug('post deleted successfully');
      });
    }
  }
});
