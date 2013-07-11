Template.adminPostDetailPreview.helpers({
  // post returns the current post
  post: function () {
    return Posts.findOne( Session.get('postId'));
  }
});
