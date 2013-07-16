Template.adminPostDetailPreview.helpers({
  // post returns the current post
  post: function () {
    return Posts.findOne( Session.get('postId'));
  }
});

Template.adminPostDetailPreview.events({
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
